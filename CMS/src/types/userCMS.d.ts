export interface IUserCMS {
  id: string;
  username: string;
  email: string;
  password?: string;
  name: string;
  status: 'active' | 'inactive';
  roleId: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  avatar?: string;
  role?: {
    id: string;
    name: string;
  };
}
