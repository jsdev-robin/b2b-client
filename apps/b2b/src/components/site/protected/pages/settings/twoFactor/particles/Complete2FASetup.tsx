'use client';
import { useFindBackupCodes2FAQuery } from '@/lib/features/auth/authApi';
import { Button } from '@repo/ui/components/button';
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
import { CheckCircle2, Copy, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Complete2FASetup = () => {
  const [copied, setCopied] = useState(false);
  const { data, isLoading } = useFindBackupCodes2FAQuery();
  const router = useRouter();
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

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader className="text-center">
          <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>
          <CardTitle>2FA Enabled Successfully!</CardTitle>
          <CardDescription>
            Your account is now protected with two-factor authentication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-md mx-auto space-y-4">
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

            <div className="grid grid-cols-2 gap-4">
              {isLoading
                ? [...Array(16)].map((_, idx) => (
                    <Skeleton className="h-10 rounded-lg w-full" key={idx} />
                  ))
                : data?.payload.codes.map((code, idx) => (
                    <div
                      key={idx}
                      className="bg-muted/50 rounded-lg p-4 text-sm text-center border border-border"
                    >
                      {code}
                    </div>
                  ))}
            </div>
            <ItemGroup>
              <Item variant="outline" asChild>
                <ItemContent>
                  <ItemDescription className="line-clamp-3 text-wrap">
                    <strong className="text-foreground">Important:</strong> Save
                    these backup codes in a secure location. You can use them to
                    access your account if you lose your authenticator device.
                  </ItemDescription>
                </ItemContent>
              </Item>
            </ItemGroup>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button
          disabled={isLoading}
          onClick={() => router.push('/account/dashboard/settings/security')}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default Complete2FASetup;
