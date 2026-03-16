// guides: https://redux-toolkit.js.org/rtk-query/usage/customizing-queries

import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { backoff, retryCondition } from '../helper/queryRetry';

const mutex = new Mutex();

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  credentials: 'include',
});

const SKIP_REFRESH_ENDPOINTS = [
  '/auth/store/signin',
  '/auth/store/verify-2fa',
  '/auth/store/signup',
  '/auth/store/verify',
  '/auth/store/forgot-password',
  '/auth/store/reset-password',
  '/auth/store/2fa/verify/recovery',
];

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await rawBaseQuery(args, api, extraOptions);

  const shouldSkipRefresh =
    typeof args !== 'string' &&
    args.url &&
    SKIP_REFRESH_ENDPOINTS.some((endpoint) => args.url.startsWith(endpoint));

  if (result.error && result.error.status === 401 && !shouldSkipRefresh) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await rawBaseQuery(
          { url: '/auth/admin/refresh-token', method: 'POST' },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          // retry the initial query
          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          // // Handle refresh token failure
          if (refreshResult.error?.status === 403) {
            if (typeof window !== 'undefined') {
              window.location.href = '/sign-in';
            }
          }
        }
      } finally {
        // release must be called once the mutex should be released again
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  // ref: https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#bailing-out-of-error-re-tries
  // bail out of re-tries immediately if unauthorized,
  // because we know successive re-retries would be redundant
  // if (
  //   result.error &&
  //   typeof result.error.status === 'number' &&
  //   result.error.status >= 400 &&
  //   result.error.status < 500
  // ) {
  //   retry.fail(result.error, result.meta);
  // }

  if (result.error && result.error.status === 403) {
    if (typeof window !== 'undefined') {
      window.location.href = '/sign-in';
    }
  }

  return result;
};

// Apply retry wrapper to the base query
const baseQueryWithRetry = retry(baseQueryWithReauth, {
  retryCondition: retryCondition,
  backoff: backoff,
});

export const gatewayApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry,
  tagTypes: [
    'User',
    'Sessions',
    'Passkeys',
    'BackupCodes',
    'Services',
    'Service',
  ],
  endpoints: () => ({}),
});
