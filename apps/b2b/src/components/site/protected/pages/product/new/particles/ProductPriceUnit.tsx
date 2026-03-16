'use client';

import { Button } from '@repo/ui/components/button';
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
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
import { Input } from '@repo/ui/components/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/popover';
import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { units } from '../constants/units';
import { useProductForm } from '../contexts/ProductFormContext';
import { useProductPricing } from '../hooks/useProductPricing';

const ProductPriceUnit = () => {
  const { form } = useProductForm();

  const [
    quantityUnit,
    quantityValue,
    referenceUnit,
    referenceValue,
    price,
    cost,
  ] = useWatch({
    control: form.control,
    name: [
      'variant.unitPriceMeasurement.quantityUnit',
      'variant.unitPriceMeasurement.quantityValue',
      'variant.unitPriceMeasurement.referenceUnit',
      'variant.unitPriceMeasurement.referenceValue',
      'variant.price',
      'variant.inventoryItem.cost',
    ],
  });

  const { unitPrice } = useProductPricing({
    price: +price,
    cost: +cost,
    quantityValue: +quantityValue,
    quantityUnit: quantityUnit,
    referenceValue: +referenceValue,
    referenceUnit: referenceUnit,
  });

  const measure = useMemo(() => {
    return (
      units.find((group) =>
        group.items.some((item) => item.value === quantityUnit),
      )?.items ?? []
    );
  }, [quantityUnit]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <Input
            value={
              quantityValue && quantityUnit
                ? `${unitPrice} / ${referenceValue}${referenceUnit}`
                : '--'
            }
            readOnly
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width)">
        <FieldSet>
          <FieldGroup className="gap-3">
            <Field>
              <Field className="grid grid-cols-[3fr_1fr]">
                <FormField
                  control={form.control}
                  name="variant.unitPriceMeasurement.quantityValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total amount</FormLabel>
                      <FormControl>
                        <Input type="number" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="variant.unitPriceMeasurement.quantityUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="opacity-0">Unit</FormLabel>
                      <FormControl>
                        <Combobox
                          items={units}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <ComboboxInput placeholder="unit" />
                          <ComboboxContent className="w-60" align="start">
                            <ComboboxEmpty>No units found.</ComboboxEmpty>
                            <ComboboxList>
                              {(group) => (
                                <ComboboxGroup
                                  key={group.value}
                                  items={group.items}
                                >
                                  <ComboboxLabel>{group.value}</ComboboxLabel>

                                  <ComboboxCollection>
                                    {(item) => (
                                      <ComboboxItem
                                        key={item.value}
                                        value={item.value}
                                      >
                                        {item.label}
                                        <span className="ml-auto">
                                          {item.value}
                                        </span>
                                      </ComboboxItem>
                                    )}
                                  </ComboboxCollection>
                                </ComboboxGroup>
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
            </Field>
            <Field>
              <Field className="grid grid-cols-[3fr_1fr]">
                <FormField
                  control={form.control}
                  name="variant.unitPriceMeasurement.referenceValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base measure</FormLabel>
                      <FormControl>
                        <Input type="number" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="variant.unitPriceMeasurement.referenceUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="opacity-0">Unit</FormLabel>
                      <FormControl>
                        <Combobox
                          items={measure}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <ComboboxInput placeholder="unit" />

                          <ComboboxContent className="w-60" align="start">
                            <ComboboxEmpty>No units found.</ComboboxEmpty>

                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem
                                  key={item.value}
                                  value={item.value}
                                >
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
            </Field>
            <Field>
              <div>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    form.setValue(
                      'variant.unitPriceMeasurement.quantityValue',
                      0,
                    );
                    form.setValue(
                      'variant.unitPriceMeasurement.referenceValue',
                      1,
                    );
                  }}
                >
                  Clear
                </Button>
              </div>
            </Field>
          </FieldGroup>
        </FieldSet>
      </PopoverContent>
    </Popover>
  );
};

export default ProductPriceUnit;
