import { useDeleteManyMediaMutation } from '@/lib/features/product/draft/productMediaApi';
import { RootState } from '@/lib/store';
import { Card, CardContent } from '@repo/ui/components/card';
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
import { ERROR_MESSAGE } from '@repo/ui/constants/defaultMessage';
import Editor from '@repo/ui/lexical/index';
import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useProductForm } from '../contexts/ProductFormContext';
import { useProductMedia } from '../contexts/ProductMediaContext';
import ProductCategoryForm from './ProductCategoryForm';
import ProductMedia from './ProductMedia';

const ProductInfoForm = () => {
  const { form } = useProductForm();

  return (
    <Card>
      <CardContent>
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FormField
                  control={form.control}
                  name="input.title"
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
                  name="input.descriptionHtml"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrption</FormLabel>
                      <FormControl>
                        <Editor placeholder="Descrption" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Field>
              <Field>
                <FieldLabel>
                  <MediaAction />
                </FieldLabel>
                <ProductMedia />
              </Field>
              <Field>
                <ProductCategoryForm />
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </CardContent>
    </Card>
  );
};

const MediaAction = () => {
  const { ids, clear } = useProductMedia();
  const payload = useSelector((store: RootState) => store.draft.payload);
  const [deleteManyMedia, { isLoading }] = useDeleteManyMediaMutation();

  const handlePullMedia = async () => {
    await toast.promise(
      deleteManyMedia({
        productId: payload?._id,
        ids: ids,
      })
        .unwrap()
        .then((res) => {
          clear();
          return res;
        }),
      {
        error: (err) => err?.data?.message || ERROR_MESSAGE,
      },
    );
  };

  return (
    <React.Fragment>
      <span>{ids.length > 0 ? `${ids.length} file selected` : 'Media'}</span>
      {ids.length > 0 && (
        <span
          className="ml-auto block text-destructive cursor-pointer hover:underline"
          onClick={handlePullMedia}
        >
          {isLoading ? 'Removing...' : 'Remove'}
        </span>
      )}
    </React.Fragment>
  );
};

export default ProductInfoForm;
