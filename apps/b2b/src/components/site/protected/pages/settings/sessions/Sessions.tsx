'use client';

import {
  useFindSessionsQuery,
  useSignoutSessionMutation,
} from '@/lib/features/auth/authApi';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Skeleton } from '@repo/ui/components/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '@repo/ui/constants/defaultMessage';
import { formatDistanceToNow } from 'date-fns';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import SessionOutAll from './particles/SessionOutAll';

const Sessions = () => {
  const { data, isLoading } = useFindSessionsQuery();
  const [signoutSession, { isLoading: loading }] = useSignoutSessionMutation();

  const handleSessionOut = async (token: string) => {
    await toast.promise(signoutSession(token).unwrap(), {
      loading: 'Kicking that device out...',
      success: (res) => res?.message || SUCCESS_MESSAGE,
      error: (err) => err?.data?.message || ERROR_MESSAGE,
    });
  };

  return (
    <section>
      <div className="wrapper">
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>
              Make sure you recognise all recent sign-in activity for your
              account. You can sign out anywhere you’re still signed in.
            </CardDescription>
            <CardAction>
              <SessionOutAll />
            </CardAction>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Browser/Device</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              {isLoading ? (
                <TableBody>
                  {[...Array(4)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-20" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {data?.payload?.sessions.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        {formatDistanceToNow(new Date(item.loggedInAt), {
                          addSuffix: true,
                        })}
                      </TableCell>
                      <TableCell>
                        {item.deviceInfo?.browser} on <br />
                        {item.deviceInfo?.os}
                      </TableCell>
                      <TableCell>{item.ip}</TableCell>
                      <TableCell>
                        {item.location?.city}, {item.location?.country}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSessionOut(item.token)}
                          disabled={loading || !item.status}
                        >
                          <LogOut />
                          {item.status ? ' Sign Out' : ' Signed Out'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Sessions;
