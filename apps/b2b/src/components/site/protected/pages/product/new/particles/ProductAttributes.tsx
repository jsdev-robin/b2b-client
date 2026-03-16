'use client';

import { useLazyFindAttributeQuery } from '@/lib/features/taxonomy/categoryApi';
import { Button } from '@repo/ui/components/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  useComboboxAnchor,
} from '@repo/ui/components/combobox';
import debounce from 'lodash.debounce';
import { PlusCircle } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useProductAttributes } from '../contexts/ProductAttributesContext';
import { useProductForm } from '../contexts/ProductFormContext';

const ProductAttributes = () => {
  const anchor = useComboboxAnchor();
  const { form } = useProductForm();
  const [findAttribute, { data }] = useLazyFindAttributeQuery();
  const { setValues } = useProductAttributes();

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
    <Combobox
      multiple
      items={data?.payload.attributes ?? []}
      onValueChange={setValues}
    >
      <ComboboxTrigger
        render={
          <Button variant="secondary" size="sm">
            <PlusCircle />
            Add options like size or color
          </Button>
        }
      />
      <ComboboxContent anchor={anchor}>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item, i) => (
            <ComboboxItem key={i} value={item}>
              {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default ProductAttributes;
