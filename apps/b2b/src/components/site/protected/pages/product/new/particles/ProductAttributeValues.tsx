'use client';

import { useLazyFindValueQuery } from '@/lib/features/taxonomy/categoryApi';
import { Attribute } from '@/lib/features/taxonomy/types';
import { Button } from '@repo/ui/components/button';
import { ButtonGroup } from '@repo/ui/components/button-group';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@repo/ui/components/combobox';
import { Field } from '@repo/ui/components/field';
import { Input } from '@repo/ui/components/input';
import { ItemContent, ItemMedia, ItemTitle } from '@repo/ui/components/item';
import { Square } from 'lucide-react';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { useProductForm } from '../contexts/ProductFormContext';

const ProductAttributeValues = ({ attribute }: { attribute: Attribute }) => {
  const [findValue, { data }] = useLazyFindValueQuery();
  const anchor = useComboboxAnchor();

  // const variants = useVariants(x);

  const { form } = useProductForm();

  const { append } = useFieldArray({
    control: form.control,
    name: 'input.productOptions',
  });

  return (
    <Field>
      <Input placeholder={attribute.name} readOnly />
      <Combobox
        multiple
        items={data?.payload.values ?? []}
        onValueChange={(values: Attribute[]) => {
          append({
            name: attribute.name,
            values: values.map((item: Attribute) => ({
              name: item.name,
            })),
          });
        }}
      >
        <ComboboxChips
          ref={anchor}
          className="w-full"
          onClick={() => {
            if (attribute.values?.length) {
              findValue(attribute.values);
            }
          }}
        >
          <ComboboxValue>
            {(values) => (
              <React.Fragment>
                {values.map((value: { name: string }, i: number) => (
                  <ComboboxChip key={i}>{value.name}</ComboboxChip>
                ))}
                <ComboboxChipsInput />
              </React.Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxInput showTrigger={false} placeholder="Search" />
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item, i) => (
              <ComboboxItem key={i} value={item}>
                <ItemContent className="p-0 gap-2 flex-row">
                  {item.friendly_id.includes('color') && (
                    <ItemMedia>
                      <Square
                        style={{
                          color: `${item.name}`,
                          background: `${item.name}`,
                          borderRadius: '4px',
                        }}
                      />
                    </ItemMedia>
                  )}
                  <ItemContent>
                    <ItemTitle className="whitespace-nowrap">
                      {item.name}
                    </ItemTitle>
                  </ItemContent>
                </ItemContent>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <ButtonGroup className=" justify-between">
        <ButtonGroup>
          <Button variant="destructive" type="button">
            Delete
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="secondary" type="button">
            Save
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </Field>
  );
};

export default ProductAttributeValues;
