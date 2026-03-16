'use client';

import useMe from '@/cache/useMe';
import { useDisabled2FAMutation } from '@/lib/features/auth/authApi';
import { Badge } from '@repo/ui/components/badge';
import { Button, buttonVariants } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '@repo/ui/components/item';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '@repo/ui/constants/defaultMessage';
import { cn } from '@repo/ui/lib/utils';
import { Fingerprint, ShieldCheck, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const TwoFactorMethods = () => {
  const me = useMe();
  const [disabled2FA, { isLoading }] = useDisabled2FAMutation();
  const handleDisabled2FA = async () => {
    await toast.promise(disabled2FA().unwrap(), {
      loading: 'Removing 2FA securely...',
      success: (res) => res?.message || SUCCESS_MESSAGE,
      error: (err) => err?.data?.message || ERROR_MESSAGE,
    });
  };

  return (
    <section>
      <div className="wrapper">
        <Card>
          <CardHeader>
            <CardTitle>Two-factor Authentication</CardTitle>
            <CardDescription>
              Add an additional layer of security by requiring at least two
              methods of authentication to sign in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ItemGroup className="border border-border rounded-xl">
              <Item>
                <ItemMedia variant="icon">
                  <Smartphone />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>
                    Authenticator app
                    {me?.auth.twoFA.enabled && (
                      <Badge className="bg-chart-2/5 text-chart-2">
                        Configured
                      </Badge>
                    )}
                  </ItemTitle>
                  <ItemDescription>
                    Use an authentication app or browser extension to get
                    two-factor authentication codes when prompted.
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  {me?.auth.twoFA.enabled ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDisabled2FA}
                    >
                      {isLoading ? 'Removing...' : 'Remove'}
                    </Button>
                  ) : (
                    <Link
                      href="/account/dashboard/settings/security/two-factor"
                      className={cn(
                        buttonVariants({ size: 'sm', variant: 'outline' }),
                      )}
                    >
                      Add
                    </Link>
                  )}
                </ItemActions>
              </Item>
              <ItemSeparator />
              <Item>
                <ItemMedia variant="icon">
                  <Fingerprint />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Passkeys</ItemTitle>
                  <ItemDescription>
                    You can use the same passkeys you use for login as a second
                    factor of authentication.
                  </ItemDescription>
                </ItemContent>
              </Item>
              <ItemSeparator />
              <Item>
                <ItemMedia variant="icon">
                  <ShieldCheck />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Security keys</ItemTitle>
                  <ItemDescription>
                    Use an authenticator app like Google Authenticator to
                    generate time-based verification codes. If you ever lose
                    access to your device, recovery codes can be used to sign in
                    securely.
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Link
                    href="/account/dashboard/settings/security/two-factor/backup-codes"
                    className={cn(
                      buttonVariants({ size: 'sm', variant: 'outline' }),
                    )}
                  >
                    View
                  </Link>
                </ItemActions>
              </Item>
            </ItemGroup>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TwoFactorMethods;
