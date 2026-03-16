'use client';

import { useSignupMutation } from '@/lib/features/auth/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/button';
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
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const SignUp = () => {
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();
  const form = useForm<z.infer<typeof authValidator.signup>>({
    resolver: zodResolver(authValidator.signup),
    mode: 'onChange',
    defaultValues: {
      familyName: '',
      givenName: '',
      email: '',
      password: 'Passw0rd!',
      passwordConfirm: 'Passw0rd!',
    },
  });

  async function onSubmit(data: z.infer<typeof authValidator.signup>) {
    await toast.promise(
      signup(data)
        .unwrap()
        .then((res) => {
          router.push('/sessions/verify');
          return res;
        }),
      {
        loading: 'Creating your account...',
        success: (res) => res?.message || SUCCESS_MESSAGE,
        error: (err) => err?.data?.message || ERROR_MESSAGE,
      },
    );
  }

  return (
    <section>
      <div className="container max-w-md flex justify-center">
        <div className="flex flex-col gap-6 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>
                    Enter your information below to create your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FieldGroup>
                    <FieldSet>
                      <FieldGroup className="grid grid-cols-2">
                        <Field>
                          <FormField
                            control={form.control}
                            name="familyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
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
                            name="givenName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </Field>
                      </FieldGroup>
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
                      </Field>
                      <Field>
                        <FormField
                          control={form.control}
                          name="passwordConfirm"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
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
                          {isLoading && <Spinner />}
                          Sing up
                        </Button>
                      </Field>
                      <FieldSeparator>Or continue with</FieldSeparator>
                      <Field>
                        <Button variant="outline" type="button">
                          <GitHub />
                          Continue with Github
                        </Button>
                        <Button variant="outline" type="button">
                          <Google />
                          Continue with Google
                        </Button>
                      </Field>
                      <Field>
                        <FieldDescription className="text-center">
                          Already have an account?{' '}
                          <Link href="/sign-in">Sign in</Link>
                        </FieldDescription>
                      </Field>
                    </FieldSet>
                  </FieldGroup>
                </CardContent>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
