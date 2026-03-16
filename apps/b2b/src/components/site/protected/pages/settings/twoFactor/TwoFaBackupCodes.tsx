'use client';

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
  ItemContent,
  ItemDescription,
  ItemGroup,
} from '@repo/ui/components/item';
import { Skeleton } from '@repo/ui/components/skeleton';
import { Copy, Download } from 'lucide-react';
import { useState } from 'react';

import {
  useFindBackupCodes2FAQuery,
  useGenerateBackupCodes2FAMutation,
} from '@/lib/features/auth/authApi';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@repo/ui/components/empty';
import { Spinner } from '@repo/ui/components/spinner';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '@repo/ui/constants/defaultMessage';
import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';
import { toast } from 'sonner';

const TwoFaBackupCodes = () => {
  const [copied, setCopied] = useState(false);
  const { data, isLoading } = useFindBackupCodes2FAQuery();
  const [startBackupCodesSetup, { isLoading: loading }] =
    useGenerateBackupCodes2FAMutation();

  const handleCopy = () => {
    if (data?.payload.codes.length) {
      navigator.clipboard.writeText(data?.payload.codes.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (data?.payload.codes) {
      const blob = new Blob([data?.payload.codes.join('\n')], {
        type: 'text/plain',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'backup-codes.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handlestartBackupCodesSetup = async () => {
    await toast.promise(
      startBackupCodesSetup()
        .unwrap()
        .then((res) => res),
      {
        loading: 'Generating new codes...',
        success: (res) => res?.message || SUCCESS_MESSAGE,
        error: (err) => err?.data?.message || ERROR_MESSAGE,
      },
    );
  };

  return (
    <section>
      <div className="wrapper max-w-lg">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recovery codes</CardTitle>
              <CardDescription>
                Keep your recovery codes as safe as your password. We recommend
                saving them with a password manager such as 1Password, Authy, or
                Keeper.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Backup Codes</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      disabled={isLoading}
                    >
                      <Copy />
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                      disabled={isLoading}
                    >
                      <Download />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {isLoading ? (
                    [...Array(16)].map((_, idx) => (
                      <Skeleton className="h-10 rounded-lg w-full" key={idx} />
                    ))
                  ) : data?.payload.codes?.length ? (
                    data.payload.codes.map((code, idx) => (
                      <div
                        key={idx}
                        className="bg-muted/50 rounded-lg px-4 py-3 text-sm text-center border border-border"
                      >
                        {code}
                      </div>
                    ))
                  ) : (
                    <Empty className="w-full mx-auto col-span-full">
                      <EmptyHeader>
                        <EmptyTitle>Enable 2FA First!</EmptyTitle>
                        <EmptyDescription>
                          You need to activate your two-factor authentication
                          app before you can generate backup codes. Once 2FA is
                          active, you can create backup codes to secure your
                          account in case you lose access.
                        </EmptyDescription>
                      </EmptyHeader>
                      <EmptyContent>
                        <Link
                          href="/account/dashboard/settings/security/two-factor"
                          className={cn(buttonVariants({}))}
                        >
                          Enable 2FA Now
                        </Link>
                      </EmptyContent>
                    </Empty>
                  )}
                </div>
                <ItemGroup>
                  <Item variant="outline" asChild>
                    <ItemContent>
                      <ItemDescription className="line-clamp-3 text-wrap">
                        <strong className="text-foreground">Important:</strong>{' '}
                        Save these backup codes in a secure location. You can
                        use them to access your account if you lose your
                        authenticator device.
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                </ItemGroup>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Generate new recovery codes</CardTitle>
              <CardDescription className="text-red-600">
                When you generate new recovery codes, you must download or copy
                the new codes. Your old codes won&apos;t work anymore.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handlestartBackupCodesSetup} disabled={loading}>
                {loading && <Spinner />}
                Generate new recovery codes
              </Button>
            </CardContent>
          </Card>
          <Link
            href="/account/dashboard/settings/security"
            className={cn(buttonVariants({ variant: 'secondary' }))}
          >
            Back to settings
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TwoFaBackupCodes;
