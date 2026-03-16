import { gatewayApi } from '../api/gatewayApi';
import { SuccessResponse } from '../types';
import { ServicesRequest } from './types';

export const servicesApi = gatewayApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation<SuccessResponse, ServicesRequest>({
      query: (data) => ({
        url: `b2b/services`,
        method: 'POST',
        body: data,
      }),
    }),

    findService: builder.mutation<SuccessResponse, ServicesRequest>({
      query: (data) => ({
        url: `b2b/services`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateServiceMutation } = servicesApi;
