'use client';

import { useChangePasswordMutation } from '@/lib/features/auth/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/ui/components/breadcrumb';
import { Button } from '@repo/ui/components/button';
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
import { authValidator } from '@repo/ui/validator/authValidator';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import PasswordSecurityTips from './particles/PasswordSecurityTips';

const PasswordChange = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const form = useForm<z.infer<typeof authValidator.changePassword>>({
    resolver: zodResolver(authValidator.changePassword),
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  async function onSubmit(data: z.infer<typeof authValidator.changePassword>) {
    await toast.promise(
      changePassword(data)
        .unwrap()
        .then((res) => {
          window.location.reload();
          return res;
        }),
      {
        loading: 'Updating your password...',
        success: (res) => res?.message || SUCCESS_MESSAGE,
        error: (err) => err?.data?.message || ERROR_MESSAGE,
      },
    );
  }

  return (
    <section>
      <div className="wrapper @container/d">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/account/dashboard/settings/security">
                        Security
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Change password</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="grid gap-4 grid-cols-1 @xl/d:grid-cols-12">
                <div className="@xl/d:col-span-7 @5xl/d:col-span-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password Change</CardTitle>
                      <CardDescription>
                        Update your account password regularly to keep your
                        account secure. Make sure your new password is strong
                        and unique.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FieldGroup>
                        <FieldSet>
                          <FieldGroup>
                            <Field>
                              <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                      <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </Field>
                            <Field>
                              <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>New password</FormLabel>
                                    <FormControl>
                                      <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </Field>
                            <Field>
                              <FormField
                                control={form.control}
                                name="confirmNewPassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Confirm wew password</FormLabel>
                                    <FormControl>
                                      <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </Field>
                            <Field>
                              <Button type="submit" disabled={isLoading}>
                                {isLoading && <Spinner />}Update Password
                              </Button>
                            </Field>
                          </FieldGroup>
                        </FieldSet>
                      </FieldGroup>
                    </CardContent>
                  </Card>
                </div>
                <div className="@xl/d:col-span-5 @5xl/d:col-span-4">
                  <PasswordSecurityTips />
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default PasswordChange;
