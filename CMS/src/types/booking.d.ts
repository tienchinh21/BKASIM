interface IUserBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  role?: string;
  isCompleted?: boolean;
  isConfirmed?: boolean;
}

export interface IBookings {
  id: string;
  bookingDesc: string;
  bookingTitle: string;
  createdAt: Date;
  updatedAt: Date;
  createdByUser: IUserBooking;
  participants: IUserBooking[];
  schedulingTime: Date;
  status: string;
}

export interface IBookingResponse {
  data: IBookings[];
  total: number;
  page: number;
  limit: number;
}
