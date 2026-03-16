'use client';

import {
  useGenerateAuthenticationOptionsMutation,
  useVerifyAuthenticationResponseMutation,
} from '@/lib/features/auth/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';
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
import { startAuthentication } from '@simplewebauthn/browser';
import { Fingerprint } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const PasskeySignIn = () => {
  const [generateAuthenticationOptions, { data, isLoading }] =
    useGenerateAuthenticationOptionsMutation();
  const [verifyAuthenticationResponse] =
    useVerifyAuthenticationResponseMutation();

  const form = useForm<z.infer<typeof authValidator.email>>({
    resolver: zodResolver(authValidator.email),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: z.infer<typeof authValidator.email>) {
    await toast.promise(generateAuthenticationOptions(data).unwrap(), {
      loading: 'Checking your email… Please wait a moment.',
      success: (res) => res?.message || SUCCESS_MESSAGE,
      error: (err) => err?.data?.message || ERROR_MESSAGE,
    });
  }

  useEffect(() => {
    if (data?.payload) {
      (async () => {
        try {
          const { options, email } = data.payload;
          const attestationResponse = await startAuthentication({
            optionsJSON: options,
          });

          await toast.promise(
            verifyAuthenticationResponse({
              credential: attestationResponse,
              email: email,
            })
              .unwrap()
              .then((res) => {
                window.location.href = '/account/dashboard/overview';
                return res;
              }),
            {
              loading: 'Completing passkey authentication… Almost done!',
              success: (res) => res?.message || SUCCESS_MESSAGE,
              error: (err) => err?.data?.message || ERROR_MESSAGE,
            },
          );
        } catch (error) {
          if (error instanceof DOMException) {
            if (error.name === 'NotAllowedError') return;
            if (error.name === 'SecurityError') {
              toast.error(
                'Passkey sign-in was cancelled or the domain is invalid',
              );
              return;
            }
          }
          toast.warning('Passkey sign-in was cancelled');
        }
      })();
    }
  }, [data?.payload, verifyAuthenticationResponse]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          <Fingerprint className="stroke-orange-500" />
          Signin with passkey
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Secure Passkey Sign-In</DialogTitle>
          <DialogDescription>
            Sign in quickly and safely using a passkey. No passwords are
            required—just your secure device authentication. Passkeys provide
            stronger security and a faster login experience.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading && <Spinner />}
                      Continue with Passkey
                    </Button>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PasskeySignIn;
