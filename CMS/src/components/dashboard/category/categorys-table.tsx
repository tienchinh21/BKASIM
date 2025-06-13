'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';

import { ICategory } from '@/types/category';

interface Props {
  rows: ICategory[];
  loading: boolean;
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (id: string) => void;
  onUpdate: (category: ICategory) => void;
}

export function CategoriesTable({
  rows,
  loading,
  onDelete,
  onUpdate,
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  count,
}: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selected, setSelected] = useState<ICategory | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedStatus, setEditedStatus] = useState<'active' | 'inactive'>('active');

  const openEditDialog = (item: ICategory) => {
    setSelected(item);
    setEditedName(item.name);
    setEditedStatus(item.status as 'active' | 'inactive');
    setEditDialogOpen(true);
  };

  const confirmEdit = () => {
    if (selected) {
      onUpdate({ ...selected, name: editedName, status: editedStatus });
    }
    closeEditDialog();
  };

  const openDeleteDialog = (item: ICategory) => {
    setSelected(item);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selected) {
      onDelete(selected.id!);
    }
    closeDeleteDialog();
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelected(null);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setSelected(null);
    setEditedName('');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Card>
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Tên danh mục</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Ngày cập nhật</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>Không có dữ liệu</TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                        color={row.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{dayjs(row.createdAt).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                    <TableCell>{dayjs(row.updatedAt).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button size="small" variant="outlined" onClick={() => openEditDialog(row)}>
                          Sửa
                        </Button>
                        <Button size="small" color="error" variant="outlined" onClick={() => openDeleteDialog(row)}>
                          Xoá
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </Card>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Xác nhận xoá</DialogTitle>
        <DialogContent>Bạn chắc chắn muốn xoá danh mục "{selected?.name}"?</DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Huỷ</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Xoá
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDialogOpen} onClose={closeEditDialog}>
        <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Tên danh mục"
            margin="dense"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <Select
            fullWidth
            label="Trạng thái"
            margin="dense"
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value as 'active' | 'inactive')}
          >
            <MenuItem value="active">Hoạt động</MenuItem>
            <MenuItem value="inactive">Không hoạt động</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Huỷ</Button>
          <Button onClick={confirmEdit} variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
