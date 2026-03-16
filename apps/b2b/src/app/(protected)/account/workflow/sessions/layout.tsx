import MainLogo from '@/components/ui/main-logo';
import React from 'react';

const AccountWorkflowLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="container py-3">
        <MainLogo />
      </header>
      <main>{children}</main>
    </>
  );
};

export default AccountWorkflowLayout;
