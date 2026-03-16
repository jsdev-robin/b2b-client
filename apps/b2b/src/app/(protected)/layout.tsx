'use client';

import React from 'react';
import Loader from './loader';

const AdminPanelLayout = ({ children }: { children: React.ReactNode }) => {
  return <Loader>{children}</Loader>;
};

export default AdminPanelLayout;
