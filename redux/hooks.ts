import {
   TypedUseSelectorHook,
   createDispatchHook,
   createSelectorHook,
   createStoreHook,
   useDispatch,
   useSelector,
} from 'react-redux';
import { ClientContext, ClientRootState } from './store/client';
import { ServerAppDispatch, ServerRootState } from './store/server';

export const useServerAppDispatch = () => useDispatch<ServerAppDispatch>();

export const useServerAppSelector: TypedUseSelectorHook<ServerRootState> =
   useSelector;

export const useClientStore = createStoreHook(ClientContext);

export const useClientAppDispatch = createDispatchHook(ClientContext);

export const useClientAppSelector: TypedUseSelectorHook<ClientRootState> =
   createSelectorHook(ClientContext);
