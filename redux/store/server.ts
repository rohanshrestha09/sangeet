import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import { songApi } from '../services/songApi';
import { albumApi } from '../services/albumApi';
import { artistApi } from '../services/artistApi';
import { playlistApi } from '../services/playlistApi';
import { searchApi } from '../services/searchApi';

export const initializeServerStore = (preloadedState = {}) =>
   configureStore({
      reducer: {
         [authApi.reducerPath]: authApi.reducer,
         [songApi.reducerPath]: songApi.reducer,
         [albumApi.reducerPath]: albumApi.reducer,
         [artistApi.reducerPath]: artistApi.reducer,
         [playlistApi.reducerPath]: playlistApi.reducer,
         [searchApi.reducerPath]: searchApi.reducer,
      },
      preloadedState,
      devTools: process.env.NODE_ENV !== 'production',
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware({}).concat([
            authApi.middleware,
            songApi.middleware,
            albumApi.middleware,
            artistApi.middleware,
            playlistApi.middleware,
            searchApi.middleware,
         ]),
   });

export type ServerStore = ReturnType<typeof initializeServerStore>;

export type ServerRootState = ReturnType<ServerStore['getState']>;

export type ServerAppDispatch = ServerStore['dispatch'];
