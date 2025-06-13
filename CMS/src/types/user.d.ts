import type { Role } from './role';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  gender: string;
  company: string;
  fieldOfStudy: string;
  job: string;
  createdAt: string;
  roles: Role[];
  status: string;
}

export interface UserResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}
