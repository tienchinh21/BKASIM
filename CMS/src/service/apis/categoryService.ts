import { ICategory } from '@/types/category';

import BaseAdminService from '../core/baseAdminService';

class CategoryService extends BaseAdminService<ICategory> {
  constructor() {
    super('/categories');
  }
}

export default new CategoryService();
