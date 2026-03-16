import { taxonomyApi } from '../api/taxonomyApi';
import { FindHSCodeResponse } from './types';

type HSCodeQuery = {
  hscode?: string;
  section?: string;
  parent?: string;
  level?: number;
  search?: string;
};

export const hscodeApi = taxonomyApi.injectEndpoints({
  endpoints: (builder) => ({
    findHSCode: builder.query<FindHSCodeResponse, HSCodeQuery>({
      query: (query) => {
        const params = new URLSearchParams({
          ...(query?.hscode && { hscode: query.hscode }),
          ...(query?.section && { section: query.section }),
          ...(query?.parent && { parent: query.parent }),
          ...(query?.level && { level: String(query.level) }),
          ...(query?.search && { search: query.search }),
        });

        return {
          url: `/hscode?${params.toString()}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useLazyFindHSCodeQuery } = hscodeApi;
