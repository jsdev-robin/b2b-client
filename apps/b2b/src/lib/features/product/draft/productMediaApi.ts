import { gatewayApi } from '../../api/gatewayApi';
import { SuccessResponse } from '../../types';
import { ManyMediaRequest, OneMediaRequest } from './types';

export const productMediaApi = gatewayApi.injectEndpoints({
  endpoints: (builder) => ({
    createOneMedia: builder.mutation<SuccessResponse, OneMediaRequest>({
      query: ({ productId, mediaId }) => ({
        url: `/store/products/${productId}/media/${mediaId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Media', 'ProductDraft'],
    }),

    deleteOneMedia: builder.mutation<SuccessResponse, OneMediaRequest>({
      query: ({ productId, mediaId }) => ({
        url: `/store/products/${productId}/media/${mediaId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Media', 'ProductDraft'],
    }),

    createManyMedia: builder.mutation<SuccessResponse, ManyMediaRequest>({
      query: ({ productId, ids }) => ({
        url: `/store/products/${productId}/media`,
        method: 'POST',
        body: ids,
      }),
      invalidatesTags: ['Media', 'ProductDraft'],
    }),

    deleteManyMedia: builder.mutation<SuccessResponse, ManyMediaRequest>({
      query: ({ productId, ids }) => ({
        url: `/store/products/${productId}/media`,
        method: 'DELETE',
        body: {
          ids,
        },
      }),
      invalidatesTags: ['Media', 'ProductDraft'],
    }),
  }),
});

export const {
  useCreateOneMediaMutation,
  useDeleteOneMediaMutation,
  useCreateManyMediaMutation,
  useDeleteManyMediaMutation,
} = productMediaApi;
