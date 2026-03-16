'use client';

import { useFinishPasswordResetMutation } from '@/lib/features/auth/authApi';
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
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const ForgotPasswordReset = () => {
  const [finishPasswordReset, { isLoading }] = useFinishPasswordResetMutation();
  const { token } = useParams<{ token: string }>();

  const form = useForm<z.infer<typeof authValidator.finishPasswordReset>>({
    resolver: zodResolver(authValidator.finishPasswordReset),
    mode: 'onChange',
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  async function onSubmit(
    data: z.infer<typeof authValidator.finishPasswordReset>,
  ) {
    await toast.promise(
      finishPasswordReset({ ...data, token: token })
        .unwrap()
        .then((res) => {
          window.location.href = '/sign-in';
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
      <div className="container max-w-md w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Reset your password</CardTitle>
                <CardDescription>
                  Choose a strong, secure password to protect your account.
                  Enter your new password below and confirm it to complete the
                  reset process.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldSet>
                  <FieldGroup>
                    <Field>
                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
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
                        name="confirmNewPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm new password</FormLabel>
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
                        Reset Password
                      </Button>
                      <FieldDescription className="text-center">
                        Remembered your password? <a href="/sign-in">Sign in</a>
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ForgotPasswordReset;
