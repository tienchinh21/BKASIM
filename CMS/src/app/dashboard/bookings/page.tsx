'use client';

import React, { useEffect, useState } from 'react';
import bookingService from '@/service/apis/bookingService';
import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useDebouncedFilters } from '@/hooks/use-debounced-filters';
import BookingsTable from '@/components/dashboard/bookings/bookings-table';

const Bookings = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filters, setFilters] = useState({
    status: '',
    fromDate: '',
    toDate: '',
  });

  const debouncedFilters = useDebouncedFilters(filters);

  const { data, isLoading } = useQuery({
    queryKey: ['bookings', page, rowsPerPage, debouncedFilters],
    queryFn: () =>
      bookingService.getAll({
        page: page + 1,
        pageSize: rowsPerPage,
        ...debouncedFilters,
      }),
  });

  const handleResetFilters = () => {
    setFilters({ status: '', fromDate: '', toDate: '' });
    setPage(0);
  };

  useEffect(() => {
    setPage(0);
  }, [filters]);

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Đặt lịch</Typography>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          select
          label="Trạng thái"
          size="small"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="pending">Chờ xác nhận</MenuItem>
          <MenuItem value="confirmed">Đã xác nhận</MenuItem>
          <MenuItem value="cancelled">Đã huỷ</MenuItem>
          <MenuItem value="completed">Hoàn tất</MenuItem>
          <MenuItem value="rejected">Từ chối</MenuItem>
          <MenuItem value="flagged_by_admin">Đánh dấu bởi quản trị viên</MenuItem>
        </TextField>

        <TextField
          type="date"
          size="small"
          label="Từ ngày"
          value={filters.fromDate}
          onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          type="date"
          size="small"
          label="Đến ngày"
          value={filters.toDate}
          onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
          InputLabelProps={{ shrink: true }}
        />

        <Button variant="outlined" onClick={handleResetFilters}>
          Đặt lại bộ lọc
        </Button>
      </Stack>

      <BookingsTable
        rows={data?.data || []}
        count={data?.total || 0}
        page={page}
        rowsPerPage={rowsPerPage}
        loading={isLoading}
        onPageChange={(newPage) => setPage(newPage)}
        onRowsPerPageChange={(newRowsPerPage) => {
          setRowsPerPage(newRowsPerPage);
          setPage(0);
        }}
      />
    </Stack>
  );
};

export default Bookings;
