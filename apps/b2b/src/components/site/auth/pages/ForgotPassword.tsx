'use client';

import { useStartPasswordResetMutation } from '@/lib/features/auth/authApi';
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
import { authValidator } from '@repo/ui/validator/authValidator';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const ForgotPassword = () => {
  const [startPasswordReset, { isLoading }] = useStartPasswordResetMutation();
  const form = useForm<z.infer<typeof authValidator.email>>({
    resolver: zodResolver(authValidator.email),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: z.infer<typeof authValidator.email>) {
    await toast.promise(
      startPasswordReset(data)
        .unwrap()
        .then((res) => {
          form.reset();
          return res;
        }),
      {
        loading: 'Please wait, we’re sending a reset link...',
        success: (res) => res?.message || SUCCESS_MESSAGE,
        error: (err) => err?.data?.message || ERROR_MESSAGE,
      },
    );
  }

  return (
    <section>
      <div className="container max-w-md w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Forgot your password?</CardTitle>
                <CardDescription>
                  Enter your registered email address below and we’ll send you a
                  link to reset your password securely.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <FieldSet>
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
                        <Button type="submit" disabled={isLoading}>
                          {isLoading && <Spinner />}
                          Send Reset Link
                        </Button>
                        <FieldDescription className="text-center">
                          Remembered your password?{' '}
                          <a href="/sign-in">Sign in</a>
                        </FieldDescription>
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

export default ForgotPassword;
