'use client';

import useMe from '@/cache/useMe';
import { Badge } from '@repo/ui/components/badge';
import Heading from '@repo/ui/components/heading';
import PasskeyFeatures from './particles/PasskeyFeatures';
import PasskeySetup from './particles/PasskeySetup';

const PasskeysSetupIntro = () => {
  const me = useMe();
  return (
    <section>
      <div className="wrapper">
        <div className="space-y-4">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge>
              WebAuthn {me?.auth.passKeys.enabled ? 'Enabled' : 'Disabled'}
            </Badge>
            <div className="text-center space-y-2">
              <Heading as="h5">Passwordless Authentication</Heading>
              <p>
                Set up passkeys for secure, passwordless sign-ins across all
                your devices. No more passwords to remember or reset.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <PasskeyFeatures />
            <PasskeySetup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasskeysSetupIntro;
