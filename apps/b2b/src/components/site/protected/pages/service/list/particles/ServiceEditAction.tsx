'use client';

import { useUpdateServiceMutation } from '@/lib/features/service/servicesApi';
import { Service } from '@/lib/features/service/types';
import { ServiceSchema } from '@/validators/ServiceSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/button';
import { ButtonGroup } from '@repo/ui/components/button-group';
import { Checkbox } from '@repo/ui/components/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';
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
import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const ServiceEditAction = ({ service }: { service: Service }) => {
  const [updateService, { isLoading }] = useUpdateServiceMutation();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ServiceSchema>>({
    resolver: zodResolver(ServiceSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      confirmed: false,
    },
  });

  useEffect(() => {
    if (service) {
      form.reset({
        title: service.title ?? '',
        description: service.description ?? '',
        price: String(service.price) ?? '',
        category: service.category ?? '',
        confirmed: service.confirmed ?? false,
      });
    }
  }, [service, form]);

  async function onSubmit(data: z.infer<typeof ServiceSchema>) {
    await toast.promise(
      updateService({
        ...data,
        id: service._id,
      })
        .unwrap()
        .then((res) => {
          form.reset();
          setOpen(false);
          return res;
        }),
      {
        loading: 'Updating Service...',
        success: (res) => res?.message || SUCCESS_MESSAGE,
        error: (err) => err?.data?.message || ERROR_MESSAGE,
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonGroup>
          <Button size="icon-sm" variant="outline" type="button">
            <Pencil />
          </Button>
        </ButtonGroup>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>
            Update the service information below and save changes.
          </DialogDescription>
        </DialogHeader>
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
                              id="update-confirmed"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <FieldLabel
                              htmlFor="update-confirmed"
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
                  <Button disabled={isLoading || !form.formState.isDirty}>
                    {isLoading && <Spinner />}
                    Update Service
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceEditAction;
