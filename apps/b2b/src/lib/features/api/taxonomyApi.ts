// guides: https://github.com/jsdev-robin/munza-docs/blob/master/taxonomy/README.md

import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { backoff, retryCondition } from '../helper/queryRetry';

export const taxonomyApi = createApi({
  reducerPath: 'taxonomyApi',
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: 'https://product-taxonomy.devmun.xyz/api/v2/en',
    }),
    { retryCondition: retryCondition, backoff: backoff },
  ),
  endpoints: () => ({}),
});
