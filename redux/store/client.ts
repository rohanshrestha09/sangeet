import { createContext } from 'react';
import { ReactReduxContextValue } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import counterReducer from '../features/counterSlice';
import musicReducer from '../features/musicSlice';

const rootReducer = combineReducers({
   counterReducer,
   musicReducer,
});

const createNoopStorage = () => {
   return {
      getItem() {
         return Promise.resolve(null);
      },
      setItem() {
         return Promise.resolve();
      },
      removeItem() {
         return Promise.resolve();
      },
   };
};

const storage =
   typeof window !== 'undefined'
      ? createWebStorage('local')
      : createNoopStorage();

const persistConfig = {
   key: 'root',
   version: 1,
   storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const clientStore = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
   devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(clientStore);

export type ClientStore = typeof clientStore;

export const ClientContext = createContext<
   ReactReduxContextValue<ClientRootState>
>(null as any);

export type ClientRootState = ReturnType<ClientStore['getState']>;

export type ClientAppDispatch = ClientStore['dispatch'];
