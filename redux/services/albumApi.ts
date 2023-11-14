import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SAAVN_API_URL } from '@/constants';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { PaginatedQuery, PaginatedResponse, Response } from '@/interface';
import { Album } from '@/interface/models';

export const albumApi = createApi({
   reducerPath: 'albumApi',
   baseQuery: fetchBaseQuery({
      baseUrl: SAAVN_API_URL,
      cache: 'no-store',
   }),
   tagTypes: [QUERY_KEYS.ALBUM],
   endpoints: (builder) => ({
      getAlbum: builder.query<Album, string>({
         query: (id) => `albums?id=${id}`,
         transformResponse: (res: Response<Album>) => res.data,
         providesTags: (_result, _error, id) => [
            { type: QUERY_KEYS.ALBUM, id },
         ],
      }),
      getAlbums: builder.query<
         PaginatedResponse<Album>['data'],
         PaginatedQuery
      >({
         query: ({ page, limit, query }) =>
            `search/albums?page=${page}&limit=${limit}&query=${query}`,
         transformResponse: (res: PaginatedResponse<Album>) => res.data,
         providesTags: (result) =>
            result
               ? [
                    ...result.results.map(({ id }) => ({
                       type: QUERY_KEYS.ALBUM,
                       id,
                    })),
                    { type: QUERY_KEYS.ALBUM, id: 'LIST' },
                 ]
               : [{ type: QUERY_KEYS.ALBUM, id: 'LIST' }],
      }),
   }),
});

export const { useGetAlbumQuery, useGetAlbumsQuery } = albumApi;
