'use client';

import {
  useLazyFindAttributeQuery,
  useLazyFindValueQuery,
} from '@/lib/features/taxonomy/categoryApi';
import { Attribute } from '@/lib/features/taxonomy/types';
import { Button } from '@repo/ui/components/button';
import { ButtonGroup } from '@repo/ui/components/button-group';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@repo/ui/components/combobox';
import { Field, FieldGroup, FieldLabel } from '@repo/ui/components/field';
import { ItemContent, ItemMedia, ItemTitle } from '@repo/ui/components/item';
import { Skeleton } from '@repo/ui/components/skeleton';
import debounce from 'lodash.debounce';
import { Square } from 'lucide-react';
import React, { useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useProductAttributes } from '../contexts/ProductAttributesContext';
import { useProductForm } from '../contexts/ProductFormContext';
import { useProductMetafields } from '../contexts/ProductMetafieldsContext';

const ProductMetafieldsForm = () => {
  const { form } = useProductForm();
  const [findAttribute, { data }] = useLazyFindAttributeQuery();
  const { values } = useProductAttributes();

  const [attribute] = useWatch({
    control: form.control,
    name: ['input.category.attributes'],
  });

  const triggerDebounce = useMemo(
    () =>
      debounce((attrs) => {
        if (attrs && attrs.length > 0) {
          findAttribute(attrs);
        }
      }, 500),
    [findAttribute],
  );

  useEffect(() => {
    triggerDebounce(attribute);
    return () => {
      triggerDebounce.cancel();
    };
  }, [attribute, triggerDebounce]);

  return (
    <React.Fragment>
      {data ? (
        <Card>
          <CardHeader>
            <CardTitle>Category metafields</CardTitle>
          </CardHeader>
          {values?.length > 0 && (
            <CardContent>
              <FieldGroup className="gap-3">
                {values.map((item) => (
                  <Field className="grid grid-cols-3 gap-4" key={item._id}>
                    <FieldLabel className="col-span-1">
                      <span>{item.name}</span>
                    </FieldLabel>
                    <div className="col-span-2 group">
                      <AttributeValue attribute={item} />
                    </div>
                  </Field>
                ))}
              </FieldGroup>
            </CardContent>
          )}
          {Array.isArray(data?.payload?.attributes) &&
            data?.payload?.attributes?.length > 0 && (
              <CardFooter>
                <ButtonGroup className="flex-wrap">
                  {data?.payload.attributes.map((item, i) => (
                    <MetafieldItem key={i} data={item} />
                  ))}
                </ButtonGroup>
              </CardFooter>
            )}
        </Card>
      ) : null}
    </React.Fragment>
  );
};

const MetafieldItem = ({ data }: { data: Attribute }) => {
  const { handleToogle, isActive } = useProductAttributes();
  return (
    <ButtonGroup>
      <Button
        size="xs"
        variant={isActive(data._id) ? 'default' : 'secondary'}
        onClick={() => handleToogle(data)}
        type="button"
      >
        {data.name}
      </Button>
    </ButtonGroup>
  );
};

const AttributeValue = ({ attribute }: { attribute: Attribute }) => {
  const anchor = useComboboxAnchor();
  const [findValue, { data, isLoading, isError }] = useLazyFindValueQuery();
  const { addMetaField } = useProductMetafields();

  const handleChange = (values: string[]) => {
    addMetaField({
      name: attribute.name,
      values: values,
    });
  };

  return (
    <Combobox
      multiple
      items={data?.payload.values ?? []}
      onValueChange={handleChange}
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
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {isError ? (
            <div className="text-destructive text-sm">Error loading values</div>
          ) : isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <ComboboxItem value="" key={i} className="px-2">
                <Skeleton className="h-3 w-full" />
              </ComboboxItem>
            ))
          ) : (
            data?.payload.values.map((item, i) => (
              <ComboboxItem key={i} value={item.name}>
                <ItemContent className="p-0 gap-2 flex-row">
                  {item.friendly_id.includes('color') && (
                    <ItemMedia>
                      <Square
                        style={{
                          color: item.name,
                          background: item.name,
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
            ))
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default ProductMetafieldsForm;
