'use client';

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
  ItemMedia,
  ItemTitle,
} from '@repo/ui/components/item';
import { Bell, CheckCircle, Lock, Shield } from 'lucide-react';

const securityItems = [
  {
    icon: Shield,
    title: 'Email Verification',
    description:
      "We'll send a verification link to your new email address to confirm the change.",
  },
  {
    icon: Lock,
    title: 'Password Protection',
    description:
      'Your current password is required to authorize any email address changes.',
  },
  {
    icon: Bell,
    title: 'Change Notifications',
    description:
      'Both your old and new email will receive notifications about this change.',
  },
  {
    icon: CheckCircle,
    title: 'Instant Updates',
    description:
      'Your email will be updated across all services once verified.',
  },
];

const EmailSecurityHighlights = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security & Privacy</CardTitle>
        <CardDescription>
          How we protect your account during email changes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ItemGroup className="*:px-0 *:first:pt-0">
          {securityItems.map((item, index) => (
            <Item key={index} size="sm">
              <ItemMedia variant="icon">
                <item.icon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDescription className="text-wrap">
                  {item.description}
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
        <ItemGroup>
          <Item variant="muted">
            <ItemDescription className="line-clamp-4 text-wrap">
              <strong>Important:</strong> After changing your email, you&apos;ll
              need to verify the new address within 24 hours. Until verified,
              you can still access your account using your old email.
            </ItemDescription>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  );
};

export default EmailSecurityHighlights;
