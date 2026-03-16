'use client';

import { useFinishEmailChangeMutation } from '@/lib/features/auth/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, buttonVariants } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Field, FieldGroup, FieldSet } from '@repo/ui/components/field';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Spinner } from '@repo/ui/components/spinner';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '@repo/ui/constants/defaultMessage';
import { cn } from '@repo/ui/lib/utils';
import { authValidator } from '@repo/ui/validator/authValidator';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const FinishEmailChange = () => {
  const { token } = useParams<{ token: string }>();
  const [finishEmailChange, { isLoading }] = useFinishEmailChangeMutation();
  const form = useForm<z.infer<typeof authValidator.finishEmailChange>>({
    resolver: zodResolver(authValidator.finishEmailChange),
    mode: 'onChange',
    defaultValues: {
      code: '',
    },
  });

  async function onSubmit(
    data: z.infer<typeof authValidator.finishEmailChange>,
  ) {
    await toast.promise(
      finishEmailChange({
        code: data.code,
        token: token,
      })
        .unwrap()
        .then((res) => {
          form.reset();
          window.location.href = '/account/dashboard/settings/email';
          return res;
        }),
      {
        loading: 'Updating your email...',
        success: (res) => res?.message || SUCCESS_MESSAGE,
        error: (err) => err?.data?.message || ERROR_MESSAGE,
      },
    );
  }

  return (
    <section>
      <div className="container max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 min-h-svh items-center justify-center">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Change Email</CardTitle>
                  <CardDescription>
                    You are about to change your account email. For security
                    reasons, we need to verify that you have access to your
                    current email address.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FieldGroup>
                    <FieldSet>
                      <FieldGroup>
                        <Field>
                          <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>OTP</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    id="OTP"
                                    type="text"
                                    placeholder="Enter OTP"
                                    required
                                  />
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                  Enter the one-time code we sent to your old
                                  email. Keep this code private. If you can’t
                                  access your old email, contact our support
                                  team for help.
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                        </Field>
                        <Field orientation="horizontal">
                          <Link
                            href="/account/dashboard/settings/email"
                            className={cn(
                              buttonVariants({ variant: 'destructive' }),
                            )}
                          >
                            Cancel
                          </Link>
                          <Button disabled={isLoading}>
                            {isLoading && <Spinner />}Change Email
                          </Button>
                        </Field>
                      </FieldGroup>
                    </FieldSet>
                  </FieldGroup>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default FinishEmailChange;
