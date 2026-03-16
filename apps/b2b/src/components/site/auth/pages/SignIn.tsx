'use client';

import { useSigninMutation } from '@/lib/features/auth/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Checkbox } from '@repo/ui/components/checkbox';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
  FieldSet,
} from '@repo/ui/components/field';
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
import { GitHub } from '@repo/ui/icons/GitHub';
import { Google } from '@repo/ui/icons/Google';
import { authValidator } from '@repo/ui/validator/authValidator';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import PasskeySignIn from './particles/PasskeySignIn';

const SignIn = () => {
  const [signin, { isLoading }] = useSigninMutation();
  const form = useForm<z.infer<typeof authValidator.signin>>({
    resolver: zodResolver(authValidator.signin),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: 'Passw0rd!',
      remember: false,
    },
  });

  async function onSubmit(data: z.infer<typeof authValidator.signin>) {
    await toast.promise(
      signin(data)
        .unwrap()
        .then((res) => {
          if (res.payload.enable2fa) {
            window.location.href = '/sessions/verify-2fa/app';
          } else {
            window.location.href = '/account/dashboard/overview';
          }
          return res;
        }),
      {
        loading: 'Signing in...',
        success: (res) => res?.message || SUCCESS_MESSAGE,
        error: (err) => err?.data?.message || ERROR_MESSAGE,
      },
    );
  }

  return (
    <section>
      <div className="container max-w-md flex justify-center">
        <div className="flex flex-col gap-6 w-full">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>
                Sign in with your Github or Google account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <FieldSet>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <FieldGroup>
                        <Field>
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="remember"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Field orientation="horizontal">
                                    <Checkbox
                                      id="me"
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                    <FormLabel htmlFor="me">
                                      Remember me
                                    </FormLabel>
                                    <Link
                                      href="/forgot-password"
                                      className="ml-auto text-sm"
                                    >
                                      Forgot your password?
                                    </Link>
                                  </Field>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </Field>
                        <Field>
                          <Button type="submit" disabled={isLoading}>
                            {isLoading && <Spinner />}
                            Sing in
                          </Button>
                        </Field>
                      </FieldGroup>
                    </form>
                  </Form>
                  <FieldGroup>
                    <FieldSeparator>Or continue with</FieldSeparator>
                    <Field>
                      <Button variant="outline" type="button">
                        <GitHub />
                        Signin with Github
                      </Button>
                      <Button variant="outline" type="button">
                        <Google />
                        Signin with Google
                      </Button>
                      <PasskeySignIn />
                      <FieldDescription className="text-center">
                        Don&apos;t have an account?{' '}
                        <Link href="/sign-up">Sign up</Link>
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </FieldGroup>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our{' '}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
