'use client';

import { useEffect, useState } from 'react';
import categoryService from '@/service/apis/categoryService';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { ICategory } from '@/types/category';
import { showToast } from '@/contexts/ToastProvider/ToastProvider';
import { useDebouncedFilters } from '@/hooks/use-debounced-filters';
import { CategoriesTable } from '@/components/dashboard/category/categorys-table';

const Page = () => {
  const queryClient = useQueryClient();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newStatus, setNewStatus] = useState<'active' | 'inactive'>('active');
  const [filters, setFilters] = useState({ name: '', status: '' });
  const debouncedFilters = useDebouncedFilters(filters);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ['categories', page, rowsPerPage, debouncedFilters],
    queryFn: () => categoryService.getAll({ page: page + 1, pageSize: rowsPerPage, ...debouncedFilters }),
  });

  const handleCreate = async (category: ICategory) => {
    try {
      await categoryService.create(category);
      showToast.success('Tạo danh mục thành công');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setAddDialogOpen(false);
      setNewName('');
      setNewStatus('active');
    } catch {
      showToast.error('Tạo danh mục thất bại');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await categoryService.delete(id);
      showToast.success('Đã xoá danh mục');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    } catch {
      showToast.error('Xoá danh mục thất bại');
    }
  };

  const handleUpdate = async (category: ICategory) => {
    try {
      await categoryService.update(category.id!, category);
      showToast.success('Đã cập nhật danh mục');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    } catch {
      showToast.error('Cập nhật danh mục thất bại');
    }
  };

  const handleAdd = () => {
    if (newName.trim()) {
      handleCreate({ name: newName.trim(), status: newStatus });
    }
  };
  const handleResetFilters = () => {
    setFilters({ name: '', status: '' });
    setPage(0);
  };

  useEffect(() => {
    setPage(0); // reset về page 0 mỗi khi filter thay đổi
  }, [filters]);
  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Danh mục</Typography>
          <Button variant="contained" color="primary" onClick={() => setAddDialogOpen(true)}>
            Thêm danh mục
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Tên danh mục"
            size="small"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
          <TextField
            select
            label="Trạng thái"
            size="small"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="active">Hoạt động</MenuItem>
            <MenuItem value="inactive">Không hoạt động</MenuItem>
          </TextField>
          <Button variant="outlined" onClick={handleResetFilters}>
            Đặt lại bộ lọc
          </Button>
        </Stack>
        <CategoriesTable
          rows={data?.data || []}
          count={data?.total || 0}
          loading={isLoading}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Stack>
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Thêm danh mục mới</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Tên danh mục"
            margin="dense"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Select
            fullWidth
            margin="dense"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value as 'active' | 'inactive')}
          >
            <MenuItem value="active">Hoạt động</MenuItem>
            <MenuItem value="inactive">Không hoạt động</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Huỷ</Button>
          <Button onClick={handleAdd} variant="contained">
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Page;
