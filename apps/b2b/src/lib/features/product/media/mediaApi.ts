import { gatewayApi } from '../../api/gatewayApi';
import { SuccessResponse } from '../../types';
import { MediaResponse } from './types';

export const mediaApi = gatewayApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadMulti: builder.mutation<SuccessResponse, FormData>({
      query: (data) => ({
        url: `/storage/media/multi`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Media'],
    }),

    uploadSingle: builder.mutation<SuccessResponse, FormData>({
      query: (data) => ({
        url: `/storage/media/single`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Media'],
    }),

    findMedia: builder.query<MediaResponse, void>({
      query: () => ({
        url: '/storage/media',
        method: 'GET',
      }),
      providesTags: ['Media'],
    }),
  }),
});

export const {
  useUploadMultiMutation,
  useUploadSingleMutation,
  useFindMediaQuery,
} = mediaApi;
