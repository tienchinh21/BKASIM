import axiosClient from '@/util/axiosClient';

class AuthService {
  constructor() {}

  login(username: string, password: string) {
    return axiosClient.post(`/login`, { username, password });
  }

  getProfile() {
    return axiosClient.get(`/cms/me`);
  }
}

export default new AuthService();
