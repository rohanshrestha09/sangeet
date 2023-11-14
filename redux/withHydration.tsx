import { ServerProvider } from './provider';
import {
   initializeServerStore,
   ServerRootState,
   ServerStore,
} from './store/server';

export const withHydration = <T extends object>(
   Component: React.FC<T>,
   getPreloadedState: (store: ServerStore) => Promise<ServerRootState>
): React.FC<T> => {
   return async function (props) {
      const serverStore = initializeServerStore();

      const preloadedState = await getPreloadedState(serverStore);

      return (
         <ServerProvider preloadedState={preloadedState}>
            <Component {...props} />
         </ServerProvider>
      );
   };
};
