'use client';

import { productValidator } from '@/validators/productValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { createContext, useContext } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import z from 'zod';

type ProductFormType = z.infer<typeof productValidator.create>;

interface ProductFormContextProps {
  form: UseFormReturn<ProductFormType>;
}

const ProductFormContext = createContext<ProductFormContextProps | undefined>(
  undefined,
);

export const useProductForm = () => {
  const context = useContext(ProductFormContext);
  if (!context)
    throw new Error('useProductForm must be used within ProductFormProvider');
  return context;
};

export const ProductFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const form = useForm<ProductFormType, undefined, ProductFormType>({
    resolver: zodResolver(productValidator.create),
    mode: 'onChange',
    defaultValues: {
      input: {
        title: '',
        descriptionHtml: '',
        handle: '',
        vendor: '',
        productType: '',
        status: 'DRAFT',
        category: {
          attributes: [],
          full_name: '',
        },
        collectionsToJoin: [],
        metafields: [],
        productOptions: [],
        seo: {
          title: '',
          description: '',
        },
        tags: [],
      },
      variant: {
        barcode: '',
        compareAtPrice: '',
        inventoryItem: {
          cost: '',
          countryCodeOfOrigin: 'AF',
          harmonizedSystemCode: '',
          measurement: {
            shippingPackageId: '',
            weight: {
              unit: 'G',
              value: 0,
            },
          },
          requiresShipping: false,
          sku: '',
          tracked: false,
        },
        inventoryPolicy: 'CONTINUE',
        inventoryQuantities: [
          {
            availableQuantity: '',
          },
        ],
        optionValues: [],
        price: '',
        taxable: false,
        taxCode: '',
        unitPriceMeasurement: {
          quantityUnit: 'KG',
          quantityValue: 0,
          referenceUnit: 'G',
          referenceValue: 1,
        },
      },
    },
  });

  return (
    <ProductFormContext.Provider value={{ form }}>
      {children}
    </ProductFormContext.Provider>
  );
};
