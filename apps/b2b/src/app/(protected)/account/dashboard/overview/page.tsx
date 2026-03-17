'use client';

import Services from '@/components/site/protected/pages/service';
import { gatewayApi } from '@/lib/features/api/gatewayApi';

const Home = () => {
  const { data: authData } = gatewayApi.usePollingAuthQuery(undefined, {
    pollingInterval: 60000,
  });

  const { data: b2bData } = gatewayApi.usePollingB2BQuery(undefined, {
    pollingInterval: 90000,
  });

  // This is for server active,
  console.log(authData);
  console.log(b2bData);

  return (
    <>
      <Services />
    </>
  );
};

export default Home;
