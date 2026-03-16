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
import { Check, Shield } from 'lucide-react';

const securityItems = [
  {
    icon: Check,
    title: 'Minimum Length',
    description: 'Password must be at least 8 characters long.',
  },
  {
    icon: Check,
    title: 'Uppercase & Lowercase',
    description: 'Include at least one uppercase and one lowercase letter.',
  },
  {
    icon: Check,
    title: 'Digit & Special Character',
    description: 'Include at least one number and one special character.',
  },
  {
    icon: Shield,
    title: 'Use Unique Passwords',
    description: 'Never reuse passwords across multiple accounts.',
  },
];

const PasswordSecurityTips = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Password Security Tips</CardTitle>
        <CardDescription>
          Best practices to keep your account safe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ItemGroup className="*:px-0 *:first:pt-0 *:last:pb-0">
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
      </CardContent>
    </Card>
  );
};

export default PasswordSecurityTips;
