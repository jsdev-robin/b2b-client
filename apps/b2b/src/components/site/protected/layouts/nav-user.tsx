'use client';

import useMe from '@/cache/useMe';
import { useSignoutMutation } from '@/lib/features/auth/authApi';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@repo/ui/components/sidebar';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '@repo/ui/constants/defaultMessage';
import { ChevronsUpDown, Lock, LogOut, RadioTower, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const me = useMe();
  const [signout, { isLoading }] = useSignoutMutation();
  const handleLogout = async () => {
    await toast.promise(signout().unwrap(), {
      loading: 'Signing out...',
      success: (res) => {
        window.location.href = `/sign-in`;
        return res.message || SUCCESS_MESSAGE;
      },
      error: (err) => err?.data?.message || ERROR_MESSAGE,
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={me?.profile.avatar?.url}
                  alt={me?.profile.displayName}
                  className="object-cover"
                />
                <AvatarFallback className="rounded-lg">
                  {me?.profile.displayName.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {me?.profile.displayName}
                </span>
                <span className="truncate text-xs">{me?.profile.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={me?.profile.avatar?.url}
                    alt={me?.profile.displayName}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg">
                    {me?.profile.displayName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {me?.profile.displayName}
                  </span>
                  <span className="truncate text-xs">{me?.profile.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  router.push('/account/dashboard/settings/profile')
                }
              >
                <User />
                Profile
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  router.push('/account/dashboard/settings/security')
                }
              >
                <Lock />
                Security
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push('/account/dashboard/settings/security/sessions')
                }
              >
                <RadioTower />
                Session
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
