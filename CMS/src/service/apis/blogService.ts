import axiosClient from '@/util/axiosClient';

import { IBlog } from '@/types/blog';

import BaseAdminService from '../core/baseAdminService';

class BlogService extends BaseAdminService<IBlog> {
  constructor() {
    super('/blogs');
  }

  private buildFormData(data: any) {
    const formData = new FormData();

    for (const key in data) {
      const value = data[key];

      if (key === 'image' && value instanceof File) {
        formData.append('image', value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    }

    return formData;
  }

  createBlog(data: any) {
    return axiosClient.post('/blogs', this.buildFormData(data), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  updateBlog(id: string, data: any) {
    return axiosClient.put(`/blogs/${id}`, this.buildFormData(data), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}

export default new BlogService();
