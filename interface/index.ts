import { Album, Artist, Playlist, Song, TopQuery } from './models';

type STATUS = 'SUCCESS' | 'FAILED';

export interface Response<T> {
   status: STATUS;
   message: string | null;
   data: T;
}

export interface PaginatedResponse<T> {
   status: STATUS;
   message: string | null;
   data: {
      total: number;
      start: number;
      results: T[];
   };
}

export interface PaginatedQuery {
   page?: number;
   limit?: number;
   query: string;
}

export interface SearchResponse {
   status: STATUS;
   message: string | null;
   data: {
      topQuery: {
         results: TopQuery[];
         position: 1;
      };
      songs: {
         results: Song[];
         position: 2;
      };
      albums: {
         results: Album[];
         position: 3;
      };
      artists: {
         results: Artist[];
         position: 4;
      };
      playlists: {
         results: Playlist[];
      };
      position: 1;
   };
}
