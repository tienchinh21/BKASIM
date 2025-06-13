'use client';

import { useEffect, useState } from 'react';
import userService from '@/service/apis/userService';
import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { showToast } from '@/contexts/ToastProvider/ToastProvider';
import { useDebouncedFilters } from '@/hooks/use-debounced-filters';
import { UsersTable } from '@/components/dashboard/users/users-table';

export default function Page() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({ role: '', status: '', name: '' });
  const debouncedFilters = useDebouncedFilters(filters);
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['users', page, rowsPerPage, debouncedFilters],
    queryFn: () =>
      userService.getAll({
        page: page + 1,
        pageSize: rowsPerPage,
        ...debouncedFilters,
      }),
    placeholderData: (previousData) => previousData,
  });

  const handleDeleteUser = async (userId: string) => {
    try {
      await userService.delete(userId);
      showToast.success('Đã xoá người dùng');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    } catch (err) {
      showToast.error('Xoá thất bại');
    }
  };

  const handleResetFilters = () => {
    setFilters({ role: '', status: '', name: '' });
    setPage(0);
  };

  useEffect(() => {
    setPage(0); // reset về page 0 mỗi khi filter thay đổi
  }, [filters]);

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Người dùng</Typography>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          label="Tên"
          size="small"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <TextField
          select
          label="Vai trò"
          size="small"
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="mentor">Mentor</MenuItem>
          <MenuItem value="mentee">Mentee</MenuItem>
        </TextField>
        <TextField
          select
          label="Trạng thái"
          size="small"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="approved">Đã duyệt</MenuItem>
          <MenuItem value="pending">Chờ duyệt</MenuItem>
          <MenuItem value="rejected">Từ chối</MenuItem>
        </TextField>
        <Button variant="outlined" onClick={handleResetFilters}>
          Đặt lại bộ lọc
        </Button>
      </Stack>

      <UsersTable
        rows={data?.data || []}
        count={data?.total || 0}
        page={page}
        rowsPerPage={rowsPerPage}
        loading={isLoading}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        onDelete={handleDeleteUser}
        showStatusColumn={true}
      />
    </Stack>
  );
}
