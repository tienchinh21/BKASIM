'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import bookingService from '@/service/apis/bookingService';
import { getBookingStatusMeta } from '@/util/booking-status';
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';

import { IBookings } from '@/types/booking';
import { showToast } from '@/contexts/ToastProvider/ToastProvider';
import BackButton from '@/components/BackButton';

const BookingDetailPage = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const { data, isLoading, refetch } = useQuery<IBookings>({
    queryKey: ['booking-detail', id],
    queryFn: () => bookingService.getById(id),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStartTime, setEditStartTime] = useState('');

  useEffect(() => {
    if (data && !isEditing) {
      setEditTitle(data.bookingTitle);
      setEditDescription(data.bookingDesc);
      setEditStartTime(data.schedulingTime ? new Date(data.schedulingTime).toISOString().slice(0, 16) : '');
    }
  }, [data, isEditing]);

  const mUpdateMutation = useMutation({
    mutationFn: (updated: IBookings) => bookingService.updatePatch(id, updated),
    onSuccess: () => {
      showToast.success('Cập nhật thành công');
      refetch();
      setIsEditing(false);
    },
  });

  const handleUpdate = () => {
    if (!data) return;
    mUpdateMutation.mutate({
      ...data,
      bookingTitle: editTitle,
      bookingDesc: editDescription,
      schedulingTime: new Date(editStartTime),
    });
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleFlag = async () => {
    try {
      await bookingService.flag(id);
      refetch();
      showToast.success('Gắn cờ thành công');
    } catch (error) {
      showToast.error('Gắn cờ thất bại');
    }
  };

  const handleDelete = async () => {
    try {
      await bookingService.delete(`/${id}`);
      router.push('/dashboard/bookings');
      showToast.success('Xoá thành công');
    } catch (error) {
      showToast.error('Xoá thất bại');
    }
  };

  if (isLoading || !data) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <BackButton label="Trở về" />
      <Stack spacing={3} mt={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight={600}>
            Chi tiết lịch hẹn
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant={isEditing ? 'outlined' : 'contained'} onClick={handleToggleEdit}>
              {isEditing ? 'Huỷ' : 'Sửa'}
            </Button>
            {isEditing && (
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Lưu
              </Button>
            )}
            <Button variant="outlined" color="warning" onClick={handleFlag}>
              Gắn cờ
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Xoá
            </Button>
          </Stack>
        </Stack>

        <Card elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#fafafa', border: '1px solid #e0e0e0' }}>
          <Typography variant="h6" gutterBottom>
            Thông tin buổi hẹn
          </Typography>
          <TextField
            fullWidth
            label="Tiêu đề"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            sx={{ mb: 2 }}
            disabled={!isEditing}
          />
          <TextField
            fullWidth
            multiline
            label="Mô tả"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            sx={{ mb: 2 }}
            disabled={!isEditing}
          />
          <TextField
            fullWidth
            type="datetime-local"
            label="Thời gian bắt đầu"
            value={editStartTime}
            onChange={(e) => setEditStartTime(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
            disabled={!isEditing}
          />
          <Typography>
            <b>Trạng thái:</b>
            <Chip
              label={getBookingStatusMeta(data.status).label}
              color={getBookingStatusMeta(data.status).color}
              size="medium"
            />
          </Typography>
        </Card>

        <Card elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#fafafa', border: '1px solid #e0e0e0' }}>
          <Typography variant="h6" gutterBottom>
            Người tạo
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <b>Họ tên:</b> {data.createdByUser.name}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <b>Email:</b> {data.createdByUser.email}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <b>Số điện thoại:</b> {data.createdByUser.phone}
          </Typography>
        </Card>

        <Card elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#fafafa', border: '1px solid #e0e0e0' }}>
          <Typography variant="h6" gutterBottom>
            Danh sách người tham gia
          </Typography>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>
                  <b>Họ tên</b>
                </TableCell>
                <TableCell>
                  <b>Email</b>
                </TableCell>
                <TableCell>
                  <b>Điện thoại</b>
                </TableCell>
                <TableCell>
                  <b>Vai trò</b>
                </TableCell>
                <TableCell>
                  <b>Đã xác nhận</b>
                </TableCell>
                <TableCell>
                  <b>Đã hoàn thành</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.participants.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>{p.phone}</TableCell>
                  <TableCell>{p.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={p.isConfirmed ? 'Có' : 'Không'}
                      color={p.isConfirmed ? 'success' : 'error'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={p.isCompleted ? 'Hoàn thành' : 'Chưa'}
                      color={p.isCompleted ? 'success' : 'default'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Stack>
    </>
  );
};

export default BookingDetailPage;
