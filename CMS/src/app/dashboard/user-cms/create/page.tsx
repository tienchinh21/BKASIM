'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import roleService from '@/service/apis/roleService';
import userCMSService from '@/service/apis/userCMSService';
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { showToast } from '@/contexts/ToastProvider/ToastProvider';
import BackButton from '@/components/BackButton';

const CreateUserCMSPage = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    status: 'active',
    roleId: '',
    avatar: null as File | null,
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: roles = [] } = useQuery({
    queryKey: ['roles'],
    queryFn: () => roleService.getAllRoles(),
  });

  const mutation = useMutation({
    mutationFn: (formData: FormData) => userCMSService.createUserCMS(formData),
    onSuccess: () => {
      showToast.success('Tạo tài khoản thành công');
      queryClient.invalidateQueries({ queryKey: ['usercms'] });
      router.push('/dashboard/user-cms');
    },
    onError: (error: any) => {
      showToast.error(error?.response?.data?.message || 'Tạo thất bại');
    },
  });

  const handleSubmit = () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value as any);
    });

    mutation.mutate(formData);
  };

  return (
    <>
      <BackButton />
      <Card sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h5">Tạo tài khoản CMS</Typography>

          <TextField
            label="Tên đăng nhập"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <TextField
            label="Mật khẩu"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <TextField label="Họ tên" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <FormControl fullWidth>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={form.status}
              label="Trạng thái"
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <MenuItem value="active">Hoạt động</MenuItem>
              <MenuItem value="inactive">Không hoạt động</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Vai trò</InputLabel>
            <Select value={form.roleId} label="Vai trò" onChange={(e) => setForm({ ...form, roleId: e.target.value })}>
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, avatar: e.target.files?.[0] || null })}
          />

          <Button variant="contained" onClick={handleSubmit} disabled={mutation.isPending}>
            Tạo tài khoản
          </Button>
        </Stack>
      </Card>
    </>
  );
};

export default CreateUserCMSPage;
