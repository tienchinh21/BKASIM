'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, isLoginedIn, isInitialized } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    if (!isInitialized) return;

    if (!isLoginedIn || !user) {
      logger.debug('[AuthGuard]: Not logged in, redirecting to sign in');
      router.replace(paths.auth.signIn);
      setIsChecking(false);
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {});
  }, [user, isLoginedIn, isInitialized]);

  if (isChecking) {
    return null;
  }

  if (isLoginedIn) {
    return <Alert color="error">Not authorized</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
