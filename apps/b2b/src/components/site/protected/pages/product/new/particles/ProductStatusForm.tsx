'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@repo/ui/components/combobox';
import { Field, FieldGroup, FieldSet } from '@repo/ui/components/field';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@repo/ui/components/item';
import { useProductForm } from '../contexts/ProductFormContext';

const status = [
  {
    value: 'ACTIVE',
    label: 'Active',
    continent: 'Sell via selected sales channels and markets',
  },
  {
    value: 'DRAFT',
    label: 'Draft',
    continent: 'Not visible on selected sales channels or markets',
  },
  {
    value: 'ARCHIVED',
    label: 'Unlisted',
    continent: 'Accessible only by direct link',
  },
];

const ProductStatusForm = () => {
  const { form } = useProductForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FormField
                  control={form.control}
                  name="input.status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Combobox
                          items={status}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <ComboboxInput />
                          <ComboboxContent>
                            <ComboboxEmpty>No status found.</ComboboxEmpty>
                            <ComboboxList>
                              {(status) => (
                                <ComboboxItem
                                  key={status.value}
                                  value={status.value}
                                >
                                  <Item className="p-0" size="xs">
                                    <ItemContent>
                                      <ItemTitle>{status.label}</ItemTitle>
                                      <ItemDescription className="text-wrap">
                                        {status.continent}
                                      </ItemDescription>
                                    </ItemContent>
                                  </Item>
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </FormControl>
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

export default ProductStatusForm;
