'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Field, FieldGroup, FieldSet } from '@repo/ui/components/field';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Textarea } from '@repo/ui/components/textarea';
import { useProductForm } from '../contexts/ProductFormContext';

const ProductListingForm = () => {
  const { form } = useProductForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search engine listing</CardTitle>
        <CardDescription>
          Add a title and description to see how this product might appear in a
          search engine listing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FormField
                  control={form.control}
                  name="input.seo.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page Title</FormLabel>
                      <FormControl>
                        <Input {...field} maxLength={70} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        {field.value?.length ?? 0} of 70 characters used
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </Field>
              <Field>
                <FormField
                  control={form.control}
                  name="input.seo.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta description</FormLabel>
                      <FormControl>
                        <Textarea {...field} maxLength={160} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        {field.value?.length ?? 0} of 160 characters used
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </Field>
              <Field>
                <FormField
                  control={form.control}
                  name="input.handle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL handle</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="/product" />
                      </FormControl>
                      <FormDescription>
                        https://devmun.com/products/
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </CardContent>
    </Card>
  );
};

export default ProductListingForm;
