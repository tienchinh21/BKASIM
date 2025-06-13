// File: app/dashboard/usercms/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import userCMSService from '@/service/apis/userCMSService';
import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { IUserCMS } from '@/types/userCMS';
import { showToast } from '@/contexts/ToastProvider/ToastProvider';
import BackButton from '@/components/BackButton';

const UserCMSDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['usercms-detail', id],
    queryFn: () => userCMSService.getById(id as string),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<IUserCMS | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setEditData({
        ...data,
      });
    }
  }, [data]);

  const { mutate: mUpdateUserCMS, isPending: isUpdating } = useMutation({
    mutationFn: (updated: any) => userCMSService.updateUserCMS(id as string, updated),
    onSuccess: () => {
      showToast.success('Cập nhật thành công');
      refetch();
      setIsEditing(false);
    },
    onError: () => {
      showToast.error('Cập nhật thất bại');
    },
  });

  const handleChange = (field: string, value: any) => {
    setEditData((prev: any) => ({ ...prev, [field]: value }));
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
      <BackButton />
      <Stack spacing={3} mt={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Chi tiết người dùng CMS</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant={isEditing ? 'outlined' : 'contained'} onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Huỷ' : 'Sửa'}
            </Button>
            {isEditing && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => mUpdateUserCMS(editData)}
                disabled={isUpdating}
              >
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
                label="Họ tên"
                value={editData?.name || ''}
                disabled={!isEditing}
                onChange={(e) => handleChange('name', e.target.value)}
                fullWidth
              />
              <TextField label="Email" value={editData?.email || ''} disabled={!isEditing} fullWidth />
              <TextField
                select
                label="Trạng thái"
                value={editData?.status || ''}
                disabled={!isEditing}
                onChange={(e) => handleChange('status', e.target.value)}
                fullWidth
              >
                <MenuItem value="active">Hoạt động</MenuItem>
                <MenuItem value="inactive">Ngưng hoạt động</MenuItem>
              </TextField>
              <TextField
                label="Ngày tạo"
                value={new Date(editData?.createdAt || '').toLocaleString()}
                disabled
                fullWidth
              />
              <TextField
                label="Ngày cập nhật"
                value={new Date(editData?.updatedAt || '').toLocaleString()}
                disabled
                fullWidth
              />
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </>
  );
};

export default UserCMSDetailPage;
