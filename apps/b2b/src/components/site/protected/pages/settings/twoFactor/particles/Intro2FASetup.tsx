'use client';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@repo/ui/components/item';
import { CheckCircle2, Key, Smartphone } from 'lucide-react';
import React from 'react';

const steps = [
  {
    icon: <Smartphone />,
    title: '1. Install an authenticator app',
    desc: 'Download an authenticator app like Google Authenticator, Authy, or 1Password on your mobile device.',
  },
  {
    icon: <Key />,
    title: '2. Scan the QR code',
    desc: 'Use your authenticator app to scan the QR code we&apos;ll provide. This links your account to the app.',
  },
  {
    icon: <CheckCircle2 />,
    title: '3. Verify and save backup codes',
    desc: 'Enter the code from your app to verify, then save your backup codes in a secure location.',
  },
];

const Intro2FASetup = ({
  setStep,
}: {
  setStep: React.Dispatch<
    React.SetStateAction<'scan' | 'intro' | 'verify' | 'complete'>
  >;
}) => {
  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>How it works</CardTitle>
        </CardHeader>
        <CardContent>
          <ItemGroup>
            {steps.map((item, i) => (
              <Item key={i} className="px-0">
                <ItemMedia variant="icon">{item.icon}</ItemMedia>
                <ItemContent>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemDescription>{item.desc}</ItemDescription>
                </ItemContent>
              </Item>
            ))}
            <Item variant="outline">
              <ItemContent>
                <ItemDescription>
                  <strong className="text-foreground">Note:</strong> Once
                  enabled, you&apos;ll need to enter a code from your
                  authenticator app each time you sign in.
                </ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={() => setStep('scan')}>Get Started</Button>
      </div>
    </div>
  );
};

export default Intro2FASetup;
