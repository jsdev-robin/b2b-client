'use client';

import { useLazyFindCategoryQuery } from '@/lib/features/taxonomy/categoryApi';
import { Button } from '@repo/ui/components/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
} from '@repo/ui/components/combobox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import { cn } from '@repo/ui/lib/utils';
import { ChevronRight } from 'lucide-react';
import React, { useEffect } from 'react';
import { useProductForm } from '../contexts/ProductFormContext';
import { useCategoryHistory } from '../hooks/useCategoryHistory';

const initialIds = [
  'aa',
  'ae',
  'ap',
  'bi',
  'bt',
  'bu',
  'co',
  'el',
  'fb',
  'fr',
  'gc',
  'ha',
  'hb',
  'hg',
  'lb',
  'ma',
  'me',
  'na',
  'os',
  'pa',
  'rc',
  'se',
  'sg',
  'so',
  'tg',
  'vp',
];

const ProductCategoryForm = () => {
  const { form } = useProductForm();
  const [findCategory, { data, isLoading, isError, isFetching }] =
    useLazyFindCategoryQuery();
  const { current, goBack, goForward } = useCategoryHistory(initialIds);

  useEffect(() => {
    findCategory(current);
  }, [current, findCategory]);

  return (
    <FormField
      control={form.control}
      name="input.category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Categories</FormLabel>
          <FormControl>
            <Combobox
              items={data?.payload.categories ?? []}
              onValueChange={field.onChange}
              value={field.value?.full_name || ''}
              disabled={isLoading || isError}
            >
              <ComboboxInput
                placeholder="Choose a product category"
                showClear
              />
              <ComboboxContent className={cn(isFetching && 'cursor-progress')}>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                {current !== initialIds && (
                  <React.Fragment>
                    <Button
                      className="w-full justify-start"
                      variant="ghost"
                      onClick={goBack}
                    >
                      Back
                    </Button>
                    <ComboboxSeparator />
                  </React.Fragment>
                )}
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem
                      disabled={isFetching}
                      key={item.id}
                      value={item}
                      onPointerDown={() => {
                        if (!item.isLeaf) {
                          goForward(item.children);
                          findCategory(item.children);
                        }
                      }}
                      className="justify-between data-disabled:opacity-100!"
                    >
                      {item.name}
                      {!item.isLeaf && <ChevronRight />}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </FormControl>
          <FormDescription>
            Determines tax rates and adds metafields to improve search, filters,
            and cross-channel sales
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductCategoryForm;
