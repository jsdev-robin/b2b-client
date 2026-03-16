'use client';

import { useFinishEnabled2FAMutation } from '@/lib/features/auth/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Field, FieldGroup } from '@repo/ui/components/field';
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
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const Finish2FASetup = ({
  token,
  setStep,
}: {
  token: string;
  setStep: React.Dispatch<
    React.SetStateAction<'scan' | 'intro' | 'verify' | 'complete'>
  >;
}) => {
  const [finish2FASetup, { isLoading }] = useFinishEnabled2FAMutation();
  const form = useForm<z.infer<typeof authValidator.finish2FASetup>>({
    resolver: zodResolver(authValidator.finish2FASetup),
    mode: 'onChange',
    defaultValues: {
      totp: '',
    },
  });
  async function onSubmit(data: z.infer<typeof authValidator.finish2FASetup>) {
    await toast.promise(
      finish2FASetup({
        totp: data.totp,
        secret: token,
      })
        .unwrap()
        .then((res) => {
          form.reset();
          setStep('complete');
          return res;
        }),
      {
        loading: 'Enabling 2FA...',
        success: (res) => res?.message || SUCCESS_MESSAGE,
        error: (err) => err?.data?.message || ERROR_MESSAGE,
      },
    );
  }

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Verify Setup</CardTitle>
          <CardDescription>
            Enter the 6-digit code from your authenticator app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="max-w-xs mx-auto space-y-4">
                <FieldGroup>
                  <Field>
                    <FormField
                      control={form.control}
                      name="totp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Verify the code from the app</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="000000"
                              maxLength={6}
                              required
                              className="text-center tracking-widest"
                              autoComplete="off"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Field>
                  <Field>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && <Spinner />}
                      Verify and Enable
                    </Button>
                  </Field>
                </FieldGroup>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Finish2FASetup;
