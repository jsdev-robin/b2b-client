import { gatewayApi } from '../../api/gatewayApi';
import { SuccessResponse } from '../../types';
import { OptionResponse } from './types';

export const prodcutOptionApi = gatewayApi.injectEndpoints({
  endpoints: (builder) => ({
    createOption: builder.mutation<SuccessResponse, string>({
      query: (data) => ({
        url: '/store/product/draft/options ',
        method: 'POST',
        body: {
          name: data,
        },
      }),
      invalidatesTags: ['ProductOption'],
    }),

    findOneOption: builder.query<OptionResponse, void>({
      query: () => ({
        url: '/store/product/draft/options ',
        method: 'GET',
      }),
      providesTags: ['ProductOption'],
    }),

    pushOptionValue: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/store/product/draft/options/value/push ',
        method: 'PATCH',
      }),
      invalidatesTags: ['ProductOption'],
    }),

    pullOptionValue: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/store/product/draft/options/value/pull ',
        method: 'PATCH',
      }),
      invalidatesTags: ['ProductOption'],
    }),
  }),
});

export const {
  useCreateOptionMutation,
  useFindOneOptionQuery,
  usePushOptionValueMutation,
  usePullOptionValueMutation,
} = prodcutOptionApi;
