'use client';

import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Package,
  Tag,
} from 'lucide-react';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@repo/ui/components/sidebar';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Orders',
      url: '#',
      icon: Package,
      items: [
        {
          title: 'Drafts',
          url: '#',
        },
        {
          title: 'Abandoned checkouts',
          url: '#',
        },
      ],
    },
    {
      title: 'Products',
      url: '#',
      icon: Tag,
      items: [
        {
          title: 'List',
          url: '/account/dashboard/product/list',
        },
        {
          title: 'Collections',
          url: '/account/dashboard/product/collections',
        },
        {
          title: 'Inventory',
          url: '#',
        },
        {
          title: 'Purchase orders',
          url: '#',
        },
        {
          title: 'Transfers',
          url: '#',
        },
        {
          title: 'Gift cards',
          url: '#',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
