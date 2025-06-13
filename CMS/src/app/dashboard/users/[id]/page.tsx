'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import roleService from '@/service/apis/roleService';
import userService from '@/service/apis/userService';
import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { showToast } from '@/contexts/ToastProvider/ToastProvider';
import BackButton from '@/components/BackButton';
import BookingsTable from '@/components/dashboard/bookings/bookings-table';
import { UsersTable } from '@/components/dashboard/users/users-table';

const UserDetailWithTabs = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [tab, setTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUserById(id as string, 'admin'),
  });

  const { data: roles = [] } = useQuery({
    queryKey: ['roles'],
    queryFn: () => roleService.getAllRoles(),
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ['user-bookings', id],
    queryFn: () => userService.getUserBookings(id as string),
    enabled: tab === 'bookings',
  });

  const { data: following = [] } = useQuery({
    queryKey: ['user-following', id],
    queryFn: () => userService.getUserFollowing(id as string),
    enabled: tab === 'following',
  });

  useEffect(() => {
    if (user?.data) {
      setEditData({
        ...user.data,
        roleIds: user.data.roles?.map((r: any) => r.id) || [],
      });
    }
  }, [user]);

  const { mutate: mUpdateUser, isPending: isUpdating } = useMutation({
    mutationFn: (updated: any) => userService.updateUser(id as string, updated),
    onSuccess: () => {
      showToast.success('Cập nhật thành công');
      refetch();
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
    onError: () => showToast.error('Cập nhật thất bại'),
  });

  const handleChange = (field: string, value: any) => {
    setEditData((prev: any) => ({ ...prev, [field]: value }));
  };

  if (isLoading || !user) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  const data = user.data;

  const InfoTab = (
    <Stack spacing={3} mt={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Chi tiết người dùng</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant={isEditing ? 'outlined' : 'contained'} onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Huỷ' : 'Sửa'}
          </Button>
          {isEditing && (
            <Button variant="contained" color="primary" onClick={() => mUpdateUser(editData)} disabled={isUpdating}>
              {isUpdating ? 'Đang lưu...' : 'Lưu'}
            </Button>
          )}
        </Stack>
      </Stack>

      <Card sx={{ p: 4, maxWidth: 720, mx: 'auto', borderRadius: 4 }}>
        <Stack spacing={3} alignItems="center">
          <Avatar src={previewAvatar || data.avatar || ''} sx={{ width: 100, height: 100 }} />
          {isEditing && (
            <Button variant="outlined" component="label">
              Chọn ảnh
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setEditData((prev: any) => ({ ...prev, avatar: file }));
                    setPreviewAvatar(URL.createObjectURL(file));
                  }
                }}
              />
            </Button>
          )}
          <Stack direction="row" spacing={2} width="100%" flexWrap="wrap">
            <TextField
              fullWidth
              label="Họ tên"
              value={editData.name || ''}
              disabled={!isEditing}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              value={editData.email || ''}
              disabled={!isEditing}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            <TextField
              fullWidth
              label="SĐT"
              value={editData.phone || ''}
              disabled={!isEditing}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            <TextField
              fullWidth
              select
              label="Giới tính"
              value={editData.gender || ''}
              disabled={!isEditing}
              onChange={(e) => handleChange('gender', e.target.value)}
            >
              <MenuItem value="male">Nam</MenuItem>
              <MenuItem value="female">Nữ</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Công ty"
              value={editData.company || ''}
              disabled={!isEditing}
              onChange={(e) => handleChange('company', e.target.value)}
            />
            <TextField
              fullWidth
              label="Chuyên ngành"
              value={editData.fieldOfStudy || ''}
              disabled={!isEditing}
              onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
            />
            <TextField
              fullWidth
              label="Nghề nghiệp"
              value={editData.job || ''}
              disabled={!isEditing}
              onChange={(e) => handleChange('job', e.target.value)}
            />
            <TextField
              fullWidth
              select
              label="Trạng thái"
              value={editData.status || ''}
              disabled={!isEditing}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <MenuItem value="pending">Chờ duyệt</MenuItem>
              <MenuItem value="approved">Đã duyệt</MenuItem>
              <MenuItem value="rejected">Từ chối</MenuItem>
            </TextField>
            <Select
              multiple
              fullWidth
              value={editData.roleIds || []}
              onChange={(e) => handleChange('roleIds', e.target.value)}
              displayEmpty
              disabled={!isEditing}
              renderValue={(selected) =>
                roles
                  .filter((r) => selected.includes(r.id))
                  .map((r) => r.name)
                  .join(', ') || 'Chọn vai trò'
              }
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
            <TextField fullWidth label="Ngày tạo" value={new Date(editData.createdAt).toLocaleString()} disabled />
            <TextField fullWidth label="Ngày cập nhật" value={new Date(editData.updatedAt).toLocaleString()} disabled />
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );

  const BookingsTab = (
    <Box mt={2}>
      <BookingsTable
        rows={bookings || []}
        count={bookings.length}
        page={0}
        rowsPerPage={bookings.length}
        loading={false}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Box>
  );

  const FollowingTab = (
    <Box mt={2}>
      <UsersTable
        rows={following || []}
        count={following.length}
        page={0}
        rowsPerPage={following.length}
        loading={false}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        onDelete={() => {}}
        showStatusColumn={false}
      />
    </Box>
  );

  const tabContent: Record<string, React.ReactNode> = {
    info: InfoTab,
    bookings: BookingsTab,
    following: FollowingTab,
  };

  return (
    <>
      <BackButton />
      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} sx={{ mt: 2 }}>
        <Tab label="Thông tin cá nhân" value="info" />
        <Tab label="Lịch hẹn" value="bookings" />
        <Tab label="Đang theo dõi" value="following" />
      </Tabs>
      {tabContent[tab]}
    </>
  );
};

export default UserDetailWithTabs;
