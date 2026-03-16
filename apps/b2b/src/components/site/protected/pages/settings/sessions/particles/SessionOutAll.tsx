'use client';

import { useSignoutAllSessionMutation } from '@/lib/features/auth/authApi';
import { Button } from '@repo/ui/components/button';
import { Spinner } from '@repo/ui/components/spinner';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '@repo/ui/constants/defaultMessage';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

const SessionOutAll = () => {
  const [signoutAllSession, { isLoading }] = useSignoutAllSessionMutation();

  const handleAllSessionOut = async () => {
    await toast.promise(signoutAllSession().unwrap(), {
      loading: 'Signing out from all devices...',
      success: (res) => res?.message || SUCCESS_MESSAGE,
      error: (err) => err?.data?.message || ERROR_MESSAGE,
    });
  };
  return (
    <Button
      size="sm"
      variant="destructive"
      onClick={handleAllSessionOut}
      disabled={isLoading}
    >
      {isLoading && <Spinner />}
      <LogOut />
      Sign Out All
    </Button>
  );
};

export default SessionOutAll;
