'use client';

import { useLazyFindHSCodeQuery } from '@/lib/features/taxonomy/hscodeApi';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { ButtonGroup } from '@repo/ui/components/button-group';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/ui/components/collapsible';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@repo/ui/components/combobox';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@repo/ui/components/field';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { Switch } from '@repo/ui/components/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/ui/components/tooltip';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import debounce from 'lodash.debounce';
import { ChevronDown, CircleAlert } from 'lucide-react';
import React, { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useProductForm } from '../contexts/ProductFormContext';

countries.registerLocale(enLocale);

const countryOptions = Object.entries(countries.getNames('en')).map(
  ([code, name]) => ({ code, name }),
);

const weights = [
  { label: 'Gram', value: 'G' },
  { label: 'Kilogram', value: 'KG' },
  { label: 'Pound', value: 'LB' },
  { label: 'Ounce', value: 'OZ' },
];

const ProductShippingForm = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { form } = useProductForm();

  const [countryCodeOfOrigin, harmonizedSystemCode] = useWatch({
    control: form.control,
    name: [
      'variant.inventoryItem.countryCodeOfOrigin',
      'variant.inventoryItem.harmonizedSystemCode',
    ],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping</CardTitle>
        <CardAction>
          <Field>
            <FormField
              control={form.control}
              name="variant.inventoryItem.requiresShipping"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Field orientation="horizontal">
                      <FieldLabel htmlFor="requiresShipping">
                        Physical product
                      </FieldLabel>
                      <Switch
                        id="requiresShipping"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </Field>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Field>
        </CardAction>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <FieldGroup className="grid grid-cols-[4fr_2fr]">
            <Field>
              <FormField
                control={form.control}
                name="variant.inventoryItem.measurement.shippingPackageId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Package</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Sample box - 22 × 13.7 × 4.2 cm, 0 kg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Field>
            <Field className="grid grid-cols-[3fr_1.5fr]">
              <FormField
                control={form.control}
                name="variant.inventoryItem.measurement.weight.value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product weight</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="0.00" type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="variant.inventoryItem.measurement.weight.unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="opacity-0">Unit</FormLabel>
                    <FormControl>
                      <Combobox
                        items={weights}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <ComboboxInput />
                        <ComboboxContent>
                          <ComboboxEmpty>No items found.</ComboboxEmpty>
                          <ComboboxList>
                            {(item) => (
                              <ComboboxItem key={item.value} value={item.value}>
                                {item.label}
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
      </CardContent>
      <CardFooter className="w-full">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="grid grid-cols-1 gap-4 w-full"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between gap-4">
              {isOpen ? (
                <Label>Customs information</Label>
              ) : (
                <ButtonGroup>
                  <ButtonGroup>
                    <Button variant="secondary" type="button" size="sm">
                      Country of origin{' '}
                      {countryCodeOfOrigin && (
                        <Badge variant="outline">{countryCodeOfOrigin}</Badge>
                      )}
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button variant="secondary" type="button" size="sm">
                      HS Code
                      {harmonizedSystemCode && (
                        <Badge variant="outline">
                          {harmonizedSystemCode.split('-')[0]}
                        </Badge>
                      )}
                    </Button>
                  </ButtonGroup>
                </ButtonGroup>
              )}
              <Button variant="ghost" size="icon" type="button">
                <ChevronDown />
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FormField
                    control={form.control}
                    name="variant.inventoryItem.countryCodeOfOrigin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Country/Region of origin
                          <Tooltip>
                            <TooltipTrigger>
                              <CircleAlert className="size-4 ml-px" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                In most cases, where the product was
                                manufactured or assembled.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Combobox
                            items={countryOptions}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <ComboboxInput />
                            <ComboboxContent>
                              <ComboboxEmpty>No items found.</ComboboxEmpty>
                              <ComboboxList>
                                {(item) => (
                                  <ComboboxItem
                                    key={item.code}
                                    value={item.code}
                                  >
                                    {item.name}
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
                <Field>
                  <HSCode />
                </Field>
              </FieldGroup>
            </FieldSet>
          </CollapsibleContent>
        </Collapsible>
      </CardFooter>
    </Card>
  );
};

const HSCode = () => {
  const [findHSCode, { data }] = useLazyFindHSCodeQuery();
  const { form } = useProductForm();

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        findHSCode({ search: value });
      }, 300),
    [findHSCode],
  );

  return (
    <FormField
      control={form.control}
      name="variant.inventoryItem.harmonizedSystemCode"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Harmonized System (HS) code
            <Tooltip>
              <TooltipTrigger>
                <CircleAlert className="size-4 ml-px" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  HS codes describe products for international trade. Set a
                  6-digit default code or codes by country/region for greater
                  accuracy
                </p>
              </TooltipContent>
            </Tooltip>
          </FormLabel>
          <FormControl>
            <Combobox
              items={data?.payload.hscodes ?? []}
              value={field.value}
              onValueChange={field.onChange}
            >
              <ComboboxInput
                placeholder="Enter a 6-digit code or search by keyword"
                onChange={(e) => debouncedSearch(e.target.value)}
              />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem
                      key={item.hscode}
                      value={`${item.hscode} - ${item.description}`}
                    >
                      {item.hscode} - {item.description}
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
  );
};

export default ProductShippingForm;
