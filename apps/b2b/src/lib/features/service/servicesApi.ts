import { gatewayApi } from '../api/gatewayApi';
import { SuccessResponse } from '../types';
import {
  ServicesQueryParams,
  ServicesRequest,
  ServicesResponse,
} from './types';

export const servicesApi = gatewayApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation<SuccessResponse, ServicesRequest>({
      query: (data) => ({
        url: `b2b/services`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Services'],
    }),

    findServices: builder.query<ServicesResponse, ServicesQueryParams>({
      query: ({ search, pagination, sort, category }) => {
        const params = new URLSearchParams({
          ...(search && { q: String(search) }),
          ...(pagination.pageIndex && {
            page: String(pagination.pageIndex + 1),
          }),
          ...(pagination.pageSize && { limit: String(pagination.pageSize) }),
          ...(sort && { sort: String(sort) }),
          ...(category && { category: String(category) }),
        });

        return {
          url: `b2b/services?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Services'],
    }),

    deleteService: builder.mutation<SuccessResponse, string>({
      query: (id) => ({
        url: `b2b/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Services'],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useFindServicesQuery,
  useDeleteServiceMutation,
} = servicesApi;
