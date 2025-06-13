'use client';

import React, { useMemo, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { User } from '@/types/user';

interface Props {
  user: User | null | undefined;
}

export function AccountDetailsForm({ user }: Props): React.ReactNode {
  const initialForm = useMemo(
    () => ({
      name: user?.name || '',
      email: user?.email || '',
    }),
    [user]
  );

  const [form, setForm] = useState(initialForm);

  if (!user) return null;

  const handleChange = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Update payload:', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Chỉnh sửa thông tin cá nhân" title="Thông tin tài khoản" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12}>
              <FormControl fullWidth>
                <InputLabel>Họ tên</InputLabel>
                <OutlinedInput label="Họ tên" value={form.name} onChange={handleChange('name')} />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <InputLabel>Email</InputLabel>
                <OutlinedInput label="Email" value={form.email} onChange={handleChange('email')} />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <TextField
                label="Trạng thái"
                value={user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            Lưu thay đổi
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
