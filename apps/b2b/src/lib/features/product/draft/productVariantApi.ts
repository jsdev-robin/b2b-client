import { gatewayApi } from '../../api/gatewayApi';
import { SuccessResponse } from '../../types';

export const productVariantApi = gatewayApi.injectEndpoints({
  endpoints: (builder) => ({
    previewVariant: builder.mutation<SuccessResponse, string>({
      query: (data) => ({
        url: '/store/product/draft/varinat/create ',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const { usePreviewVariantMutation } = productVariantApi;
