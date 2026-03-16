'use client';

import { buttonVariants } from '@repo/ui/components/button';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@repo/ui/components/item';
import { cn } from '@repo/ui/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const PasskeySuccessState = () => {
  return (
    <Item variant="muted">
      <ItemHeader className="justify-center">
        <ItemMedia variant="icon" className="size-16 rounded-full">
          <CheckCircle2 className="size-8" />
        </ItemMedia>
      </ItemHeader>
      <ItemContent>
        <ItemTitle className="text-center block w-full">
          Passkey Registered!
        </ItemTitle>
        <ItemDescription className="text-center">
          Your device wwe has been successfully registered. You can now use it
          to sign in securely.
        </ItemDescription>
      </ItemContent>
      <ItemFooter className="flex-col">
        <Link
          href="/account/dashboard/settings/security/passkey/devices"
          className={cn(buttonVariants({ size: 'lg' }), 'w-full')}
        >
          View All Devices
        </Link>
        <Link
          href="/account/dashboard/settings/security"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'lg' }),
            'w-full',
          )}
        >
          Back to Dashboard
        </Link>
      </ItemFooter>
    </Item>
  );
};

export default PasskeySuccessState;
