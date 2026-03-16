'use client';

import { productValidator } from '@/validators/productValidator';
import { Button } from '@repo/ui/components/button';
import { Form } from '@repo/ui/components/form';
import Heading from '@repo/ui/components/heading';
import { useWatch } from 'react-hook-form';
import z from 'zod';
import { ProductAttributesProvider } from './contexts/ProductAttributesContext';
import {
  ProductFormProvider,
  useProductForm,
} from './contexts/ProductFormContext';
import { ProductMediaProvider } from './contexts/ProductMediaContext';
import { ProductMetafieldsProvider } from './contexts/ProductMetafieldsContext';
import { ProductVariantsProvider } from './contexts/ProductVariantsContext';
import ProductInfoForm from './particles/ProductInfoForm';
import ProductInventoryForm from './particles/ProductInventoryForm';
import ProductListingForm from './particles/ProductListingForm';
import ProductOrganizationForm from './particles/ProductOrganizationForm';
import ProductPricingForm from './particles/ProductPricingForm';
import ProductShippingForm from './particles/ProductShippingForm';
import ProductStatusForm from './particles/ProductStatusForm';
import ProductVariantsForm from './particles/ProductVariantsForm';

const ProductNewForm = () => {
  const { form } = useProductForm();

  async function onSubmit(data: z.infer<typeof productValidator.create>) {
    console.log(data);
  }

  console.log(form.formState.errors);

  const [productOptions] = useWatch({
    control: form.control,
    name: ['input.productOptions'],
  });

  console.log(productOptions);

  return (
    <section>
      <div className="wrapper">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Heading as="h6">Add product</Heading>
              <div className="grid gap-4 grid-cols-12">
                <div className="col-span-8">
                  <div className="space-y-4">
                    <ProductInfoForm />
                    <ProductPricingForm />
                    <ProductInventoryForm />
                    <ProductShippingForm />
                    <ProductVariantsForm />
                    {/* <ProductMetafieldsForm /> */}
                    <ProductListingForm />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="space-y-4">
                    <ProductStatusForm />
                    <ProductOrganizationForm />
                  </div>
                </div>
              </div>
              <Button>Save</Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

const ProductNew = () => (
  <ProductFormProvider>
    <ProductAttributesProvider>
      <ProductVariantsProvider>
        <ProductMediaProvider>
          <ProductMetafieldsProvider>
            <ProductNewForm />
          </ProductMetafieldsProvider>
        </ProductMediaProvider>
      </ProductVariantsProvider>
    </ProductAttributesProvider>
  </ProductFormProvider>
);

export default ProductNew;
