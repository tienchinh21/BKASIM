import axiosClient from '@/util/axiosClient';

import { Role } from '@/types/role';

import BaseAdminService from '../core/baseAdminService';

class RoleService extends BaseAdminService<Role> {
  constructor() {
    super('/roles');
  }
  async getAllRoles(): Promise<Role[]> {
    const response = await axiosClient.get(this.endpoint);
    return response.data;
  }
}

export default new RoleService();
