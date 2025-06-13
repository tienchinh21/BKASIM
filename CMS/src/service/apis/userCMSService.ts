import axiosClient from '@/util/axiosClient';

import BaseAdminService from '../core/baseAdminService';

class UserCMSService extends BaseAdminService<any> {
  constructor() {
    super('admin/users');
  }

  async updateUserCMS(id: string, data: any) {
    const formData = new FormData();

    if (data.avatar instanceof File) {
      formData.append('avatar', data.avatar);
    }

    for (const key in data) {
      if (key !== 'avatar' && data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }

    return axiosClient.patch(`${this.endpoint}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async createUserCMS(data: any) {
    return axiosClient.post(this.endpoint, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export default new UserCMSService();
