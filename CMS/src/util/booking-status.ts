import type { ChipProps } from '@mui/material';

export function getBookingStatusMeta(status: string): {
  label: string;
  color: ChipProps['color'];
} {
  switch (status) {
    case 'pending':
      return { label: 'Chờ xác nhận', color: 'default' };
    case 'confirmed':
      return { label: 'Đã xác nhận', color: 'info' };
    case 'completed':
      return { label: 'Đã hoàn thành', color: 'success' };
    case 'cancelled':
      return { label: 'Đã hủy', color: 'error' };
    case 'rejected':
      return { label: 'Đã từ chối', color: 'error' };
    case 'flagged_by_admin':
      return { label: 'Đã gắn cờ', color: 'warning' };
    default:
      return { label: 'Chờ xác nhận', color: 'default' };
  }
}
