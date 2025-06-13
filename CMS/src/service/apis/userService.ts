import axiosClient from '@/util/axiosClient';

import { User } from '@/types/user.d';

import BaseAdminService from '../core/baseAdminService';

class UserService extends BaseAdminService<User> {
  constructor() {
    super('/users');
  }

  async getUserById(id: string, view: string) {
    return await axiosClient.get(`${this.endpoint}/${id}`, {
      params: {
        view,
      },
    });
  }

  async updateUser(id: string, data: any) {
    const formData = new FormData();

    for (const key in data) {
      if (key === 'avatar' && data.avatar instanceof File) {
        formData.append('avatar', data.avatar);
      } else if (key === 'roleIds' && Array.isArray(data.roleIds)) {
        data.roleIds.forEach((roleId: string) => {
          formData.append('roleIds', roleId);
        });
      } else if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }

    return axiosClient.put(`${this.endpoint}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async getUserFollowing(id: string) {
    const res = await axiosClient.get(`${this.endpoint}/${id}/following`);
    return res.data;
  }

  async getUserBookings(id: string) {
    const res = await axiosClient.get(`${this.endpoint}/${id}/bookings`);
    return res.data;
  }
}

export default new UserService();
