import { taxonomyApi } from '../api/taxonomyApi';
import {
  FindAttributeResponse,
  FindCategoryResponse,
  FindValueResponse,
} from './types';

export const categoriesApi = taxonomyApi.injectEndpoints({
  endpoints: (builder) => ({
    findCategory: builder.query<FindCategoryResponse, string[]>({
      query: (ids) => ({
        url: `/category?in=${JSON.stringify(ids)}`,
        method: 'GET',
      }),
    }),

    findAttribute: builder.query<FindAttributeResponse, string[]>({
      query: (ids) => ({
        url: `/attribute?in=${JSON.stringify(ids)}`,
        method: 'GET',
      }),
    }),

    findValue: builder.query<FindValueResponse, string[]>({
      query: (ids) => ({
        url: `/value?in=${JSON.stringify(ids)}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLazyFindCategoryQuery,
  useLazyFindAttributeQuery,
  useLazyFindValueQuery,
} = categoriesApi;
