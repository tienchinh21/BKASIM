'use client';

import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';

import { Role } from '@/types/role';

interface RolesTableProps {
  rows: Role[];
  loading: boolean;
  onDelete: (roleId: string) => void;
  onUpdate: (role: Role) => void;
}

export function RolesTable({ rows, loading, onDelete, onUpdate }: RolesTableProps): JSX.Element {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [editedName, setEditedName] = useState('');

  const handleOpenDeleteDialog = (role: Role): void => {
    setSelectedRole(role);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = (): void => {
    setDeleteDialogOpen(false);
    setSelectedRole(null);
  };

  const handleConfirmDelete = (): void => {
    if (selectedRole) {
      onDelete(selectedRole.id);
    }
    handleCloseDeleteDialog();
  };

  const handleOpenEditDialog = (role: Role): void => {
    setSelectedRole(role);
    setEditedName(role.name);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = (): void => {
    setEditDialogOpen(false);
    setSelectedRole(null);
    setEditedName('');
  };

  const handleConfirmEdit = (): void => {
    if (selectedRole) {
      onUpdate({ ...selectedRole, name: editedName });
    }
    handleCloseEditDialog();
  };
  return (
    <>
      <Card>
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Tên vai trò</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Ngày cập nhật</TableCell>
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
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{dayjs(row.createdAt).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                    <TableCell>{dayjs(row.updatedAt).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button size="small" variant="outlined" onClick={() => handleOpenEditDialog(row)}>
                          Sửa
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() => handleOpenDeleteDialog(row)}
                        >
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

      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Xác nhận xoá</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xoá vai trò <strong>{selectedRole?.name}</strong> không? Thao tác này không thể hoàn
            tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Huỷ</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Xoá
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Chỉnh sửa vai trò</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên vai trò"
            fullWidth
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Huỷ</Button>
          <Button onClick={handleConfirmEdit} variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
