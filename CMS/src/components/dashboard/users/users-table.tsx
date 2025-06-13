'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

import { User } from '@/types/user';

interface UsersTableProps {
  rows: User[];
  count: number;
  page: number;
  rowsPerPage: number;
  loading: boolean;
  onPageChange: (e: unknown, newPage: number) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (userId: string) => void;
  showStatusColumn?: boolean;
}

export function UsersTable({
  rows,
  count,
  page,
  rowsPerPage,
  loading,
  onPageChange,
  onRowsPerPageChange,
  onDelete,
  showStatusColumn = true,
}: UsersTableProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleOpenDialog = (user: User): void => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleCloseDialog = (): void => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = (): void => {
    if (selectedUser) {
      onDelete(selectedUser.id);
    }
    handleCloseDialog();
  };

  return (
    <>
      <Card>
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Họ tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Giới tính</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Nghề nghiệp</TableCell>
                <TableCell>Vai trò</TableCell>
                {showStatusColumn && <TableCell>Trạng thái</TableCell>}
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>Không có dữ liệu</TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar src={row.avatar || undefined} />
                        <Typography variant="subtitle2">{row.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.gender === 'male' ? 'Nam' : 'Nữ'}</TableCell>
                    <TableCell>{dayjs(row.createdAt).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{row.job}</TableCell>
                    <TableCell>{row.roles.map((r) => r.name).join(', ')}</TableCell>
                    {showStatusColumn && row.status ? (
                      <TableCell>
                        <Chip
                          label={
                            row.status === 'approved' ? 'Duyệt' : row.status === 'rejected' ? 'Từ chối' : 'Chờ duyệt'
                          }
                          color={
                            row.status === 'approved' ? 'success' : row.status === 'rejected' ? 'error' : 'warning'
                          }
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                    ) : null}
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button size="small" variant="outlined" component={Link} href={`/dashboard/users/${row.id}`}>
                          Xem chi tiết
                        </Button>
                        <Button size="small" color="error" variant="outlined" onClick={() => handleOpenDialog(row)}>
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
      </Card>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xoá</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xoá người dùng <strong>{selectedUser?.name}</strong> không? Thao tác này không thể
            hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Huỷ</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
