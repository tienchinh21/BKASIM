export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    users: '/dashboard/users',
    roles: '/dashboard/roles',
    articles: '/dashboard/articles',
    bookings: '/dashboard/bookings',
    categories: '/dashboard/categories',
    usersCms: '/dashboard/user-cms',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
