'use client';

import { useHandshakeBackupCode2FAMutation } from '@/lib/features/auth/authApi';
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
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const Verify2faByRecoveryCode = () => {
  const [verifyBackupCode, { isLoading }] = useHandshakeBackupCode2FAMutation();
  const form = useForm<z.infer<typeof authValidator.verify2FARecovery>>({
    resolver: zodResolver(authValidator.verify2FARecovery),
    mode: 'onChange',
    defaultValues: {
      code: '',
    },
  });
  async function onSubmit(
    data: z.infer<typeof authValidator.verify2FARecovery>,
  ) {
    await toast.promise(
      verifyBackupCode(data)
        .unwrap()
        .then((res) => {
          window.location.href = '/account/dashboard/overview';
          return res;
        }),
      {
        loading: 'Verifying your identity...',
        success: (res) => res?.message || SUCCESS_MESSAGE,
        error: (err) => err?.data?.message || ERROR_MESSAGE,
      },
    );
  }

  return (
    <section className="flex min-h-svh w-full items-center justify-center">
      <div className="max-w-xs w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Login with Recovery Code</CardTitle>
                <CardDescription>
                  Can&apos;t access your authentication app? Use a backup
                  recovery code to securely log in to your account.
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
                              <FormLabel>Enter your recovery code</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="XXXX-XXXX"
                                  className="text-center tracking-widest"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </Field>
                      <Field>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading && <Spinner />}Verify
                        </Button>
                        <Link
                          href="/sessions/verify-2fa/app"
                          className={cn(
                            buttonVariants({ variant: 'destructive' }),
                          )}
                        >
                          Use 2FA app instead
                        </Link>
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                </FieldGroup>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Verify2faByRecoveryCode;
