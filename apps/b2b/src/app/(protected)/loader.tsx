'use client';

import React from 'react';
import { userAuthApi } from '../../lib/features/auth/authApi';
import Loading from '../loading';

const Loader = ({ children }: { children: React.ReactNode }) => {
  const profile = userAuthApi.endpoints.findProfile.useQuery();

  if (profile.isError) {
    window.location.href = '/sign-in';
    return null;
  }

  return profile.isLoading ? <Loading /> : children;
};

export default Loader;
