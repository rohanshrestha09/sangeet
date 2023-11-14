import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SAAVN_API_URL } from '@/constants';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { PaginatedQuery, PaginatedResponse, Response } from '@/interface';
import { Playlist } from '@/interface/models';

export const playlistApi = createApi({
   reducerPath: 'playlistApi',
   baseQuery: fetchBaseQuery({
      baseUrl: SAAVN_API_URL,
      cache: 'no-store',
   }),
   tagTypes: [QUERY_KEYS.PLAYLIST],
   endpoints: (builder) => ({
      getPlaylist: builder.query<Playlist, string>({
         query: (id) => `playlists?id=${id}`,
         transformResponse: (res: Response<Playlist>) => res.data,
         providesTags: (_result, _error, id) => [
            { type: QUERY_KEYS.PLAYLIST, id },
         ],
      }),
      getPlaylists: builder.query<
         PaginatedResponse<
            Omit<Playlist, 'followerCount' | 'fanCount' | 'shares'>
         >['data'],
         PaginatedQuery
      >({
         query: ({ page, limit, query }) =>
            `search/playlists?page=${page}&limit=${limit}&query=${query}`,
         transformResponse: (
            res: PaginatedResponse<
               Omit<Playlist, 'followerCount' | 'fanCount' | 'shares'>
            >
         ) => res.data,
         providesTags: (result) =>
            result
               ? [
                    ...result.results.map(({ id }) => ({
                       type: QUERY_KEYS.PLAYLIST,
                       id,
                    })),
                    { type: QUERY_KEYS.PLAYLIST, id: 'LIST' },
                 ]
               : [{ type: QUERY_KEYS.PLAYLIST, id: 'LIST' }],
      }),
   }),
});

export const { useGetPlaylistQuery, useGetPlaylistsQuery } = playlistApi;
