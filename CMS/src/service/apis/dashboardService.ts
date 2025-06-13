import axiosClient from '@/util/axiosClient';

class DashboardService {
  async getChartData() {
    return axiosClient.get('/admin/stats/chart-data');
  }

  async getLatestUsers() {
    return axiosClient.get('/admin/summary/latest-users');
  }

  async getLatestBookings() {
    return axiosClient.get('/admin/summary/latest-bookings');
  }
  async getUserGrowthCompare() {
    return axiosClient.get('/admin/stats/user-growth-compare');
  }
  async getBookingGrowthCompare() {
    return axiosClient.get('/admin/stats/booking-growth-compare');
  }
}

export default new DashboardService();
