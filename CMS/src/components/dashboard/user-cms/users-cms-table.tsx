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

import { IUserCMS } from '@/types/userCMS';

interface UsersTableCMSProps {
  rows: IUserCMS[];
  count: number;
  page: number;
  rowsPerPage: number;
  loading: boolean;
  onPageChange: (e: unknown, newPage: number) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (userId: string) => void;
}

export function UsersTableCMS({
  rows,
  count,
  page,
  rowsPerPage,
  loading,
  onPageChange,
  onRowsPerPageChange,
  onDelete,
}: UsersTableCMSProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUserCMS | null>(null);

  const handleOpenDialog = (user: IUserCMS): void => {
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
                <TableCell>Tên đăng nhập</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Trạng thái</TableCell>
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
                  <TableCell colSpan={8}>Không có dữ liệu</TableCell>
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
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{dayjs(row.createdAt).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status === 'active' ? 'Hoạt động' : 'Ngưng hoạt động'}
                        color={row.status === 'active' ? 'success' : 'default'}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" color="error" variant="outlined" onClick={() => handleOpenDialog(row)}>
                        Xoá
                      </Button>
                      <Button size="small" variant="outlined" component={Link} href={`/dashboard/user-cms/${row.id}`}>
                        Xem chi tiết
                      </Button>
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
      <Dialog open={open} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Xác nhận xoá</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xoá tài khoản CMS <strong>{selectedUser?.name}</strong> không?
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
