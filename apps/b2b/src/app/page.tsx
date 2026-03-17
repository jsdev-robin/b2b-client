'use client';

import { gatewayApi } from '@/lib/features/api/gatewayApi';

const Home = () => {
  const { data: authData } = gatewayApi.usePollingAuthQuery(undefined, {
    pollingInterval: 25000,
  });

  const { data: b2bData } = gatewayApi.usePollingB2BQuery(undefined, {
    pollingInterval: 30000,
  });

  console.log(authData);
  console.log(b2bData);

  return <div>Home</div>;
};

export default Home;
