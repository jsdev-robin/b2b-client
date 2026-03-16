import AuthHeader from '@/components/site/auth/layouts/AuthHeader';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthHeader />
      <main className="py-3 md:py-6 lg:py-12">{children}</main>
    </>
  );
};

export default AuthLayout;
