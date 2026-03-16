import { ROLE_COOKIES } from '@repo/ui/constants/cookie';
import Session from '@repo/ui/lib/Session';
import { redirect } from 'next/navigation';
import React from 'react';

const Layout2Fa = async ({ children }: { children: React.ReactNode }) => {
  const session = await Session({
    cookieName: ROLE_COOKIES.SUPER_ADMIN.PENDING_2FA,
    key: process.env.ACTIVATION_SECRET,
  });

  if (!session) {
    return redirect('/sign-in');
  }

  return <>{children}</>;
};

export default Layout2Fa;
