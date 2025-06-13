import React from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import { IBookings } from '@/types/booking';

type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected';
type ChipColor = 'warning' | 'success' | 'error' | 'default' | 'info' | 'primary' | 'secondary';

const statusMap: Record<BookingStatus, { label: string; color: ChipColor }> = {
  pending: { label: 'Đang chờ', color: 'warning' },
  confirmed: { label: 'Đã xác nhận', color: 'success' },
  completed: { label: 'Đã hoàn thành', color: 'success' },
  cancelled: { label: 'Đã hủy', color: 'error' },
  rejected: { label: 'Đã từ chối', color: 'error' },
};

interface BookingsTableProps {
  rows: IBookings[];
  count: number;
  page: number;
  rowsPerPage: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const BookingsTable = ({
  rows,
  count,
  page,
  rowsPerPage,
  loading,
  onPageChange,
  onRowsPerPageChange,
}: BookingsTableProps) => {
  if (loading) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Người tạo</TableCell>
              <TableCell>Thời gian bắt đầu</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Người tham gia</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.bookingTitle}</TableCell>
                <TableCell>{row.createdByUser.name}</TableCell>
                <TableCell>{new Date(row.schedulingTime).toLocaleString('vi-VN')}</TableCell>
                <TableCell>
                  <Chip
                    label={statusMap[row.status as BookingStatus].label}
                    color={statusMap[row.status as BookingStatus].color}
                    size="medium"
                  />
                </TableCell>
                <TableCell>
                  {row.participants.map((p, idx) => (
                    <Typography key={idx}>{p.name}</Typography>
                  ))}
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" component={Link} href={`/dashboard/bookings/${row.id}`}>
                    Xem chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
      />
    </Card>
  );
};

export default BookingsTable;
