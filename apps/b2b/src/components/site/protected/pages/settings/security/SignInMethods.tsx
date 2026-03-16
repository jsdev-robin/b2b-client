'use client';

import useMe from '@/cache/useMe';
import { buttonVariants } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import Heading from '@repo/ui/components/heading';
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
import { cn } from '@repo/ui/lib/utils';
import { Mail, RectangleEllipsis, UserLock } from 'lucide-react';
import Link from 'next/link';

const SignInMethods = () => {
  const me = useMe();

  return (
    <section>
      <div className="wrapper">
        <div className="space-y-4">
          <Heading as="h5">Account Settings</Heading>
          <Card>
            <CardHeader>
              <CardTitle>Sign-in Methods</CardTitle>
              <CardDescription>
                Customize how you access your account. Link your Git profiles
                and set up passkeys for seamless, secure authentication.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ItemGroup className="border border-border rounded-xl">
                <Item>
                  <ItemMedia variant="icon">
                    <Mail />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Email</ItemTitle>
                    <ItemDescription>{me?.profile.email}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Link
                      href="/account/dashboard/settings/email"
                      className={cn(
                        buttonVariants({ size: 'sm', variant: 'outline' }),
                      )}
                    >
                      Manage
                    </Link>
                  </ItemActions>
                </Item>
                <ItemSeparator />
                <Item>
                  <ItemMedia variant="icon">
                    <RectangleEllipsis />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Password</ItemTitle>
                    <ItemDescription>Configured</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Link
                      href="/account/dashboard/settings/security/password-change"
                      className={cn(
                        buttonVariants({ size: 'sm', variant: 'outline' }),
                      )}
                    >
                      Change password
                    </Link>
                  </ItemActions>
                </Item>
                <ItemSeparator />
                <Item>
                  <ItemMedia variant="icon">
                    <UserLock />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Passkeys</ItemTitle>
                    <ItemDescription>
                      Passwordless sign-in with biometrics or security keys
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Link
                      href="/account/dashboard/settings/security/passkey"
                      className={cn(
                        buttonVariants({ size: 'sm', variant: 'outline' }),
                      )}
                    >
                      Add passkey
                    </Link>
                  </ItemActions>
                </Item>
              </ItemGroup>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SignInMethods;
