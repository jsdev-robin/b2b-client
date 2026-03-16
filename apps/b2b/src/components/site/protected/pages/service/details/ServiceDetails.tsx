'use client';

import { useFindOneQuery } from '@/lib/features/service/servicesApi';
import { Alert, AlertDescription, AlertTitle } from '@repo/ui/components/alert';
import { Badge } from '@repo/ui/components/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import Heading from '@repo/ui/components/heading';
import { Skeleton } from '@repo/ui/components/skeleton';
import { format, parseISO } from 'date-fns';
import { AlertCircleIcon } from 'lucide-react';
import { useParams } from 'next/navigation';

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useFindOneQuery(id, {
    skip: !id,
  });

  return (
    <section>
      <div className="wrapper max-w-md">
        {isError ? (
          <Alert variant="destructive" className="max-w-md">
            <AlertCircleIcon />
            <AlertTitle>Failed to load service</AlertTitle>
            <AlertDescription>
              We couldn&lsquo;t fetch the service details. The service may not
              exist or the server is not responding. Please try again later.
            </AlertDescription>
          </Alert>
        ) : isLoading ? (
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-5 w-full" />
              </CardTitle>
              <CardAction>
                <Skeleton className="h-4 w-16" />
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="mt-3 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-24" />
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{data?.payload.service.title}</CardTitle>
              <CardAction>{data?.payload.service._id.slice(0, 6)}</CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge>{data?.payload.service.category}</Badge>
                <Heading as="h5">${data?.payload.service.price}</Heading>
              </div>
              <CardDescription>
                {data?.payload.service.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              {data?.payload.service.createdAt
                ? format(
                    parseISO(data.payload.service.createdAt),
                    'MMM dd, yyyy',
                  )
                : ''}
            </CardFooter>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ServiceDetails;
