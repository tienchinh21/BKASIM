import React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import type { SxProps } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

const statusMap = {
  pending: { label: 'Đang chờ', color: 'warning' },
  approved: { label: 'Đã xác nhận', color: 'success' },
  rejected: { label: 'Đã từ chối', color: 'error' },
} as const;

export interface User {
  id: string;
  avatar: string;
  name: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface LatestUsersProps {
  users?: User[];
  sx?: SxProps;
}

export function LatestUsers({ users = [], sx }: LatestUsersProps): React.JSX.Element {
  const router = useRouter();
  return (
    <Card sx={sx}>
      <CardHeader title="Người dùng mới nhất" />
      <Divider />
      <List>
        {users.map((user, index) => (
          <ListItem
            divider={index < users.length - 1}
            key={user.id}
            onClick={() => router.push(`/dashboard/users/${user.id}`)}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemAvatar>
              {user.avatar ? (
                <Box component="img" src={user.avatar} sx={{ borderRadius: 1, height: '48px', width: '48px' }} />
              ) : (
                <Box
                  sx={{
                    borderRadius: 1,
                    backgroundColor: 'var(--mui-palette-neutral-200)',
                    height: '48px',
                    width: '48px',
                  }}
                />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              primaryTypographyProps={{ variant: 'subtitle1' }}
              secondary={`${user.email}`}
              secondaryTypographyProps={{ variant: 'body2' }}
            />
            <Chip label={statusMap[user.status].label} color={statusMap[user.status].color} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          onClick={() => router.push('/dashboard/users')}
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          Xem tất cả
        </Button>
      </CardActions>
    </Card>
  );
}
