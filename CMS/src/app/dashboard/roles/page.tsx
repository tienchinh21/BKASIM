'use client';

import roleService from '@/service/apis/roleService';
import { Button, Stack, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Role } from '@/types/role';
import { showToast } from '@/contexts/ToastProvider/ToastProvider';
import { RolesTable } from '@/components/dashboard/roles/roles-table';

const Page = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: () => roleService.getAllRoles(),
  });

  const handleDelete = async (roleId: string) => {
    try {
      await roleService.delete(roleId);
      showToast.success('Đã xoá vai trò');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    } catch (error) {
      showToast.error('Xoá vai trò thất bại');
    }
  };

  const handleUpdate = async (role: Role) => {
    try {
      await roleService.update(role.id, role);
      showToast.success('Đã cập nhật vai trò');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    } catch (error) {
      showToast.error('Cập nhật vai trò thất bại');
    }
  };

  return (
    <>
      <Stack spacing={3} mt={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Vai trò</Typography>
          <Button variant="contained" color="primary">
            Thêm vai trò
          </Button>
        </Stack>
        <RolesTable rows={data || []} loading={isLoading} onDelete={handleDelete} onUpdate={handleUpdate} />
      </Stack>
    </>
  );
};

export default Page;
