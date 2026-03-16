'use client';

import { useStartEnabled2FAQuery } from '@/lib/features/auth/authApi';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@repo/ui/components/input-group';
import { Separator } from '@repo/ui/components/separator';
import { Skeleton } from '@repo/ui/components/skeleton';
import { useCopyToClipboard } from '@repo/ui/hooks/use-copy-to-clipboard';
import { Check, Copy } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect } from 'react';

const QR2FASetup = ({
  setStep,
  setToken,
}: {
  setStep: React.Dispatch<
    React.SetStateAction<'scan' | 'intro' | 'verify' | 'complete'>
  >;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const { data, isLoading } = useStartEnabled2FAQuery(undefined, {
    pollingInterval: 100000,
  });

  useEffect(() => {
    if (data?.payload.secret) {
      setToken(data?.payload.secret);
    }
  }, [data?.payload.secret, setToken]);

  return (
    <div className="w-full space-y-4 text-center">
      <Card>
        <CardHeader>
          <CardTitle>Scan QR Code</CardTitle>
          <CardDescription>
            Open your authenticator app and scan this QR code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-xs mx-auto space-y-4">
            <Card className="bg-white size-80 p-4 gap-0">
              {isLoading ? (
                <Skeleton className="size-70 rounded-md" />
              ) : (
                data?.payload?.qrcode && (
                  <Image
                    src={data?.payload.qrcode}
                    alt="qr"
                    width={280}
                    height={280}
                    className="size-70 mx-auto"
                  />
                )
              )}
            </Card>
            <div className="grid gap-1 grid-cols-[1fr_auto_1fr] items-center">
              <Separator />
              <span className="uppercase text-xs text-muted-foreground">
                Or enter manually
              </span>
              <Separator />
            </div>
            <Card className="bg-muted/50 gap-2 py-4">
              <CardHeader className="px-4">
                <CardTitle>Secret Key</CardTitle>
              </CardHeader>
              <CardContent className="px-4">
                <InputGroup>
                  <InputGroupInput
                    placeholder={data?.payload.secret}
                    readOnly
                    disabled={isLoading}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-xs"
                      onClick={() => {
                        copyToClipboard(`${data?.payload.secret}`);
                      }}
                      disabled={isLoading}
                    >
                      {isCopied ? <Check /> : <Copy />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={() => setStep('verify')}>Continue</Button>
      </div>
    </div>
  );
};

export default QR2FASetup;
