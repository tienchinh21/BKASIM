import axiosClient from '@/util/axiosClient';

import { IBookings } from '@/types/booking';

import BaseAdminService from '../core/baseAdminService';

class BookingService extends BaseAdminService<IBookings> {
  constructor() {
    super('admin/bookings');
  }

  async flag(id: string) {
    return axiosClient.patch(`${this.endpoint}/${id}/flag`);
  }
}

export default new BookingService();
