import { z } from 'zod';
import { ORIGIN_CODE } from './constants/ORIGIN_CODE';
import { UNITS } from './constants/UNITS';

const create = z.object({
  input: z.object({
    title: z.string().nonempty('title is required'),
    descriptionHtml: z.string().optional(),
    handle: z.string().optional(),
    vendor: z.string().optional(),
    productType: z.string().optional(),
    status: z.enum(['ACTIVE', 'DRAFT', 'ARCHIVED']).optional(),
    category: z
      .object({
        id: z.string(),
        name: z.string(),
        attributes: z.array(z.string()),
        return_reasons: z.array(z.string()),
        full_name: z.string(),
      })
      .nullable()
      .optional(),
    collectionsToJoin: z.array(z.string()).optional(),
    metafields: z
      .array(
        z.object({
          namespace: z.string(),
          key: z.string(),
          type: z.string(),
          value: z.string(),
        }),
      )
      .optional(),
    productOptions: z
      .array(
        z.object({
          name: z.string(),
          values: z
            .array(
              z.object({
                name: z.string(),
              }),
            )
            .nonempty(),
        }),
      )
      .max(3)
      .optional(),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
    tags: z.array(z.any()).optional(),
  }),

  variant: z
    .object({
      barcode: z.string().optional(),
      compareAtPrice: z.string().optional(),
      inventoryItem: z
        .object({
          cost: z.string().optional(),
          countryCodeOfOrigin: z.enum(ORIGIN_CODE).optional(),
          harmonizedSystemCode: z.string().nullable().optional(),
          measurement: z
            .object({
              shippingPackageId: z.string().optional(),
              weight: z
                .object({
                  unit: z.enum(['G', 'KG', 'LB', 'OZ']).optional(),
                  value: z.union([z.string(), z.number()]).optional(),
                })
                .optional(),
            })
            .optional(),
          requiresShipping: z.boolean().optional(),
          sku: z.string().optional(),
          tracked: z.boolean().optional(),
        })
        .optional(),
      inventoryPolicy: z.enum(['CONTINUE', 'DENY']).optional(),
      inventoryQuantities: z
        .array(
          z.object({
            availableQuantity: z.union([z.string(), z.number()]).optional(),
            locationId: z.string().optional(),
          }),
        )
        .optional(),
      optionValues: z
        .array(
          z
            .object({
              id: z.string().optional(),
              linkedMetafieldValue: z.string().optional(),
              name: z.string().optional(),
              optionId: z.string().optional(),
              optionName: z.string().optional(),
            })
            .optional(),
        )
        .optional(),
      price: z.string().optional(),
      taxable: z.boolean().optional(),
      taxCode: z.string().optional(),
      unitPriceMeasurement: z
        .object({
          quantityUnit: z.enum(UNITS).optional(),
          quantityValue: z.union([z.string(), z.number()]).optional(),
          referenceUnit: z.enum(UNITS).optional(),
          referenceValue: z.union([z.string(), z.number()]).optional(),
        })
        .optional(),
    })
    .optional(),

  media: z
    .array(
      z.object({
        alt: z.string(),
        contentType: z.string(),
        mediaId: z.string(),
        src: z.url(),
      }),
    )
    .optional(),

  variants: z.array(
    z.object({
      title: z.string(),
      optionValues: z.array(
        z.object({
          name: z.string(),
          value: z.string(),
        }),
      ),
    }),
  ),
});

export const productValidator = {
  create,
};
