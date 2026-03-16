import { buttonVariants } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { cn } from '@repo/ui/lib/utils';
import { ArrowRight, Key, Smartphone } from 'lucide-react';
import Link from 'next/link';

const actions = [
  {
    href: '/account/dashboard/settings/security/passkey/enabled?return_to=/settings/security',
    icon: <Key />,
    text: 'Create New Passkey',
    showArrow: true,
  },
  {
    href: '/account/dashboard/settings/security/passkey/devices',
    icon: <Smartphone />,
    text: 'Manage Devices',
    showArrow: false,
  },
];

const PasskeySetup = () => {
  return (
    <Card className="self-start">
      <CardHeader>
        <CardTitle>Get Started</CardTitle>
        <CardDescription>
          Set up your first passkey in just a few steps
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actions.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={cn(
                buttonVariants({ size: 'lg', variant: 'secondary' }),
                'w-full',
              )}
            >
              {item.icon}
              {item.text}
              {item.showArrow && <ArrowRight />}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PasskeySetup;
