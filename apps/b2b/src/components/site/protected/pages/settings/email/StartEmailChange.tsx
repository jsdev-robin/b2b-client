'use client';

import useMe from '@/cache/useMe';
import { useStartEmailChangeMutation } from '@/lib/features/auth/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/ui/components/breadcrumb';
import { Button, buttonVariants } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@repo/ui/components/field';
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
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import EmailSecurityHighlights from './particles/EmailSecurityHighlights';

const StartEmailChange = () => {
  const [startEmailChange, { isLoading }] = useStartEmailChangeMutation();
  const me = useMe();
  const form = useForm<z.infer<typeof authValidator.startEmailChange>>({
    resolver: zodResolver(authValidator.startEmailChange),
    mode: 'onChange',
    defaultValues: {
      newEmail: '',
      confirmEmail: '',
      password: 'Passw0rd!',
    },
  });

  async function onSubmit(
    data: z.infer<typeof authValidator.startEmailChange>,
  ) {
    await toast.promise(
      startEmailChange(data)
        .unwrap()
        .then((res) => {
          form.reset();
          return res;
        }),
      {
        loading: 'Sending verification email...',
        success: (res) => res?.message || SUCCESS_MESSAGE,
        error: (err) => err?.data?.message || ERROR_MESSAGE,
      },
    );
  }

  return (
    <section>
      <div className="wrapper @container/d">
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
                <BreadcrumbPage>Change email</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 grid-cols-1 @xl/d:grid-cols-12">
                <div className="@xl/d:col-span-7 @5xl/d:col-span-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Email Address</CardTitle>
                      <CardDescription>
                        Update your email address to keep your account secure
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FieldGroup>
                        <FieldSet>
                          <FieldGroup>
                            <Field>
                              <FieldLabel htmlFor="currentEmail">
                                Current Email
                              </FieldLabel>
                              <Input
                                id="currentEmail"
                                type="email"
                                value={me?.profile.email}
                                readOnly
                              />
                              <FieldDescription>
                                This is your currently registered email address
                              </FieldDescription>
                            </Field>
                            <Field>
                              <FormField
                                control={form.control}
                                name="newEmail"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>New Email Address</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription>
                                      Enter the new email address you want to
                                      use
                                    </FormDescription>
                                  </FormItem>
                                )}
                              />
                            </Field>
                            <Field>
                              <FormField
                                control={form.control}
                                name="confirmEmail"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Confirm New Email</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription>
                                      Re-enter your new email to confirm
                                    </FormDescription>
                                  </FormItem>
                                )}
                              />
                            </Field>
                            <Field>
                              <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                      <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription>
                                      Verify your identity by entering your
                                      current password
                                    </FormDescription>
                                  </FormItem>
                                )}
                              />
                            </Field>
                            <Field orientation="horizontal">
                              <Link
                                href="/account/dashboard/settings/security"
                                className={cn(
                                  buttonVariants({ variant: 'destructive' }),
                                )}
                              >
                                Cancel
                              </Link>
                              <Button type="submit" disabled={isLoading}>
                                {isLoading && <Spinner />}
                                Update Email Address
                              </Button>
                            </Field>
                          </FieldGroup>
                        </FieldSet>
                      </FieldGroup>
                    </CardContent>
                  </Card>
                </div>
                <div className="@xl/d:col-span-5 @5xl/d:col-span-4">
                  <EmailSecurityHighlights />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default StartEmailChange;
