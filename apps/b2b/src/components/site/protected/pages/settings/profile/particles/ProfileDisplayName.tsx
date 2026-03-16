'use client';

import useMe from '@/cache/useMe';
import { useUpdateProfileMutation } from '@/lib/features/auth/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardAction,
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
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const ProfileDisplayName = () => {
  const me = useMe();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const form = useForm<z.infer<typeof authValidator.profile>>({
    resolver: zodResolver(authValidator.profile),
    mode: 'onChange',
    defaultValues: {
      profile: {
        familyName: '',
        givenName: '',
      },
    },
  });

  useEffect(() => {
    if (me) {
      form.reset(me);
    }
  }, [form, me]);

  async function onSubmit(data: z.infer<typeof authValidator.profile>) {
    await toast.promise(updateProfile(data).unwrap(), {
      loading: 'Updating your profile...',
      success: (res) => res?.message || SUCCESS_MESSAGE,
      error: (err) => err?.data?.message || ERROR_MESSAGE,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Display Name ({me?.profile.displayName})</CardTitle>
        <CardDescription>
          Please enter your first and last name, or a display name you are
          comfortable with.
        </CardDescription>
        {me?.auth.isVerified && (
          <CardAction>
            <Badge className="bg-chart-2/5 text-chart-2">Verified</Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FieldSet>
                <FieldGroup className="md:grid md:grid-cols-2">
                  <Field>
                    <FormField
                      control={form.control}
                      name="profile.familyName"
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
                      name="profile.givenName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Field>
                  <Field className="col-span-full">
                    <Button
                      className="max-w-max ml-auto"
                      disabled={!form.formState.isDirty || isLoading}
                    >
                      {isLoading && <Spinner />} Save
                    </Button>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileDisplayName;
