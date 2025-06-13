import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Dashboard', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'users', title: 'Người dùng', href: paths.dashboard.users, icon: 'users' },
  { key: 'roles', title: 'Vai trò', href: paths.dashboard.roles, icon: 'shield' },
  { key: 'articles', title: 'Bài viết', href: paths.dashboard.articles, icon: 'article' },
  { key: 'bookings', title: 'Đặt lịch', href: paths.dashboard.bookings, icon: 'booking' },
  { key: 'categories', title: 'Danh mục', href: paths.dashboard.categories, icon: 'category' },
  { key: 'users-cms', title: 'Quản trị viên', href: paths.dashboard.usersCms, icon: 'shieldPlus' },
] satisfies NavItemConfig[];
