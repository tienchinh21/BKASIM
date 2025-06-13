'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import userCMSService from '@/service/apis/userCMSService';
import { Button, Stack, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { UsersTableCMS } from '@/components/dashboard/user-cms/users-cms-table';

const UserCMSPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['usercms', page, rowsPerPage],
    queryFn: () => userCMSService.getAll({ page: page + 1, pageSize: rowsPerPage }),
  });

  const handleDelete = async (id: string) => {
    await userCMSService.delete(id);
    queryClient.invalidateQueries({ queryKey: ['usercms'] });
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Tài khoản CMS</Typography>
        <Button variant="contained" color="primary" onClick={() => router.push('/dashboard/user-cms/create')}>
          Thêm tài khoản
        </Button>
      </Stack>
      <UsersTableCMS
        rows={data?.data || []}
        count={data?.total || 0}
        page={page}
        rowsPerPage={rowsPerPage}
        loading={isLoading}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        onDelete={handleDelete}
      />
    </Stack>
  );
};

export default UserCMSPage;
