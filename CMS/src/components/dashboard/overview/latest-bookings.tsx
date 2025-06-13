import * as React from 'react';
import { useRouter } from 'next/navigation';
import { getBookingStatusMeta } from '@/util/booking-status';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  type SxProps,
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';

import type { IBookings } from '@/types/booking';

const statusMap = {
  pending: { label: 'Đang chờ', color: 'warning' },
  confirmed: { label: 'Đã xác nhận', color: 'success' },
  canceled: { label: 'Đã hủy', color: 'error' },
} as const;

export interface Booking {
  id: string;
  bookingTitle: string;
  createdByUser: { name: string };
  schedulingTime: string;
  status: keyof typeof statusMap;
}

export interface LatestBookingsProps {
  bookings?: IBookings[];
  sx?: SxProps;
}

export function LatestBookings({ bookings = [], sx }: LatestBookingsProps): React.JSX.Element {
  const router = useRouter();
  return (
    <Card sx={sx}>
      <CardHeader title="Lịch tư vấn mới nhất" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Người đặt</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => {
              const { label, color } = getBookingStatusMeta(booking.status);
              return (
                <TableRow
                  hover
                  key={booking.id}
                  onClick={() => router.push(`/dashboard/bookings/${booking.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{booking.bookingTitle}</TableCell>
                  <TableCell>{booking.createdByUser.name}</TableCell>
                  <TableCell>{dayjs(booking.schedulingTime).format('HH:mm DD/MM/YYYY')}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
          href="/dashboard/bookings"
        >
          Xem tất cả
        </Button>
      </CardActions>
    </Card>
  );
}
