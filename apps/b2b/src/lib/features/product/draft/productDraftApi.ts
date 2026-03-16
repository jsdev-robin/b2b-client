import { gatewayApi } from '../../api/gatewayApi';
import { SuccessResponse } from '../../types';
import { DraftResponse } from './types';

export const productDraftApi = gatewayApi.injectEndpoints({
  endpoints: (builder) => ({
    createDraft: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/store/products/draft ',
        method: 'POST',
      }),
      invalidatesTags: ['ProductDraft'],
    }),

    findDraft: builder.query<DraftResponse, void>({
      query: () => ({
        url: '/store/products/draft ',
        method: 'GET',
      }),
      providesTags: ['ProductDraft'],
      extraOptions: { maxRetries: 8 },
    }),

    updateCategoryDraft: builder.mutation<SuccessResponse, string>({
      query: (id) => ({
        url: `/store/product/draft/category/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['ProductDraft'],
    }),
  }),
});

export const {
  useCreateDraftMutation,
  useFindDraftQuery,
  useUpdateCategoryDraftMutation,
} = productDraftApi;
