import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SAAVN_API_URL } from '@/constants';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { PaginatedQuery, PaginatedResponse, Response } from '@/interface';
import { Artist, MinimalArtist } from '@/interface/models';

export const artistApi = createApi({
   reducerPath: 'artistApi',
   baseQuery: fetchBaseQuery({
      baseUrl: SAAVN_API_URL,
      cache: 'no-store',
   }),
   tagTypes: [QUERY_KEYS.ARTIST],
   endpoints: (builder) => ({
      getArtist: builder.query<Artist, string>({
         query: (id) => `artists?id=${id}`,
         transformResponse: (res: Response<Artist>) => res.data,
         providesTags: (_result, _error, id) => [
            { type: QUERY_KEYS.ARTIST, id },
         ],
      }),
      getArtists: builder.query<
         PaginatedResponse<MinimalArtist>['data'],
         PaginatedQuery
      >({
         query: ({ page, limit, query }) =>
            `search/artists?page=${page}&limit=${limit}&query=${query}`,
         transformResponse: (res: PaginatedResponse<MinimalArtist>) => res.data,
         providesTags: (result) =>
            result
               ? [
                    ...result.results.map(({ id }) => ({
                       type: QUERY_KEYS.ARTIST,
                       id,
                    })),
                    { type: QUERY_KEYS.ARTIST, id: 'LIST' },
                 ]
               : [{ type: QUERY_KEYS.ARTIST, id: 'LIST' }],
      }),
   }),
});

export const { useGetArtistQuery, useGetArtistsQuery } = artistApi;
