import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SAAVN_API_URL } from '@/constants';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { PaginatedQuery, PaginatedResponse, Response } from '@/interface';
import { Song } from '@/interface/models';

export const songApi = createApi({
   reducerPath: 'songApi',
   baseQuery: fetchBaseQuery({
      baseUrl: SAAVN_API_URL,
      cache: 'no-store',
   }),
   tagTypes: [QUERY_KEYS.SONG],
   endpoints: (builder) => ({
      getSong: builder.query<Song, string>({
         query: (id) => `songs?id=${id}`,
         transformResponse: (res: Response<Song[]>) => res.data[0],
         providesTags: (_result, _error, id) => [{ type: QUERY_KEYS.SONG, id }],
      }),
      getSongsById: builder.query<Song[], string[]>({
         query: (id) => `songs?id=${id}`,
         transformResponse: (res: Response<Song[]>) => res.data,
         providesTags: (result) =>
            result
               ? [
                    ...result.map(({ id }) => ({ type: QUERY_KEYS.SONG, id })),
                    { type: QUERY_KEYS.SONG, id: 'LIST' },
                 ]
               : [{ type: QUERY_KEYS.SONG, id: 'LIST' }],
      }),
      getSongs: builder.query<PaginatedResponse<Song>['data'], PaginatedQuery>({
         query: ({ page, limit, query }) =>
            `search/songs?page=${page}&limit=${limit}&query=${query}`,
         transformResponse: (res: PaginatedResponse<Song>) => res.data,
         providesTags: (result) =>
            result
               ? [
                    ...result.results.map(({ id }) => ({
                       type: QUERY_KEYS.SONG,
                       id,
                    })),
                    { type: QUERY_KEYS.SONG, id: 'LIST' },
                 ]
               : [{ type: QUERY_KEYS.SONG, id: 'LIST' }],
      }),
   }),
});

export const { useGetSongQuery, useGetSongsByIdQuery, useGetSongsQuery } =
   songApi;
