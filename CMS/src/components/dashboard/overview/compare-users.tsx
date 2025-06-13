import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArrowDown as ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowUp as ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

export interface IGrowthCompare {
  currentMonth: number;
  previousMonth: number;
  value: number;
  trend: 'up' | 'down';
  sx?: SxProps;
}

export function CompareUsers({ currentMonth, previousMonth, value, trend, sx }: IGrowthCompare): React.JSX.Element {
  const TrendIcon = trend === 'up' ? ArrowUpIcon : ArrowDownIcon;
  const trendColor = trend === 'up' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-error-main)';
  //   const theme = useTheme();
  //   const isDark = theme.palette.secondary.dark;
  //   console.log(isDark);

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Số lượng người dùng
              </Typography>
              <Typography variant="h4">{currentMonth}</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
              <UsersIcon fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>

          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Stack sx={{ alignItems: 'center' }} direction="row" spacing={0.5}>
              <TrendIcon color={trendColor} fontSize="var(--icon-fontSize-md)" />
              <Typography color={trendColor} variant="body2">
                {value}
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="caption">
              So với tháng trước
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
