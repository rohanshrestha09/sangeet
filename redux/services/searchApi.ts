import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SAAVN_API_URL } from '@/constants';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { PaginatedQuery, SearchResponse } from '@/interface';

export const searchApi = createApi({
   reducerPath: 'searchApi',
   baseQuery: fetchBaseQuery({
      baseUrl: SAAVN_API_URL,
      cache: 'no-store',
   }),
   tagTypes: [QUERY_KEYS.SEARCH],
   endpoints: (builder) => ({
      getSearchResults: builder.query<
         SearchResponse['data'],
         Pick<PaginatedQuery, 'query'>
      >({
         query: ({ query }) => `search/all?query=${query}`,
         transformResponse: (res: SearchResponse) => res.data,
         providesTags: (_result, _error, { query }) => [
            { type: QUERY_KEYS.SEARCH, id: query },
         ],
      }),
   }),
});

export const { useGetSearchResultsQuery, useLazyGetSearchResultsQuery } =
   searchApi;
