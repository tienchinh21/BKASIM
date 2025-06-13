'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export function AuthGuard({ children }: { children: React.ReactNode }): React.JSX.Element | null {
  const router = useRouter();
  const { user, isLoginedIn, isInitialized } = useUser();

  logger.debug('[AuthGuard]: isLoginedIn', isLoginedIn);
  logger.debug('[AuthGuard]: isInitialized', isInitialized);
  logger.debug('[AuthGuard]: user', user);

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isInitialized) return;

    if (!isLoginedIn || !user) {
      logger.debug('[AuthGuard]: User not logged in, redirecting');
      router.replace(paths.auth.signIn);
    }

    setIsChecking(false);
  }, [user, isLoginedIn, isInitialized, router]);

  if (isChecking) return null;

  return <>{children}</>;
}
