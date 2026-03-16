'use client';

import { useCreateServiceMutation } from '@/lib/features/service/servicesApi';
import { ServiceSchema } from '@/validators/ServiceSchema';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Checkbox } from '@repo/ui/components/checkbox';
import {
  Field,
  FieldGroup,
  FieldLabel,
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
import {
  NativeSelect,
  NativeSelectOption,
} from '@repo/ui/components/native-select';
import { Spinner } from '@repo/ui/components/spinner';
import { Textarea } from '@repo/ui/components/textarea';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '@repo/ui/constants/defaultMessage';
import { toast } from 'sonner';
import z from 'zod';
import {
  ServiceFormProvider,
  useServiceForm,
} from './contexts/ServiceFormContext';

const ServiceCreateForm = () => {
  const { form } = useServiceForm();
  const [createService, { isLoading }] = useCreateServiceMutation();

  async function onSubmit(data: z.infer<typeof ServiceSchema>) {
    await toast.promise(
      createService(data)
        .unwrap()
        .then((res) => {
          form.reset();
          return res;
        }),
      {
        loading: 'Creating Service...',
        success: (res) => res?.message || SUCCESS_MESSAGE,
        error: (err) => err?.data?.message || ERROR_MESSAGE,
      },
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Service</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
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
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (USD)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="0" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Field>
                <Field>
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <NativeSelect {...field}>
                            <NativeSelectOption value="">
                              Select category
                            </NativeSelectOption>
                            <NativeSelectOption value="manufacturing">
                              Manufacturing
                            </NativeSelectOption>
                            <NativeSelectOption value="logistics">
                              Logistics
                            </NativeSelectOption>
                            <NativeSelectOption value="it-services">
                              IT Services
                            </NativeSelectOption>
                            <NativeSelectOption value="consulting">
                              Consulting
                            </NativeSelectOption>
                            <NativeSelectOption value="wholesale">
                              Wholesale
                            </NativeSelectOption>
                            <NativeSelectOption value="marketing">
                              Marketing
                            </NativeSelectOption>
                            <NativeSelectOption value="finance">
                              Finance
                            </NativeSelectOption>
                          </NativeSelect>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Field>
                <Field>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Field>
                <Field>
                  <FormField
                    control={form.control}
                    name="confirmed"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Field orientation="horizontal">
                            <Checkbox
                              id="confirmed"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <FieldLabel
                              htmlFor="confirmed"
                              className="font-normal"
                            >
                              I confirm the service details are accurate
                            </FieldLabel>
                          </Field>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Field>
                <Field>
                  <Button>
                    {isLoading && <Spinner />}
                    Create Service
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

const ServiceCreate = () => (
  <ServiceFormProvider>
    <ServiceCreateForm />
  </ServiceFormProvider>
);

export default ServiceCreate;
