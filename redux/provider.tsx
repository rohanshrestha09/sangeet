'use client';

import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { PersistGate } from 'redux-persist/integration/react';
import { ClientContext, clientStore, persistor } from './store/client';
import { ServerRootState, initializeServerStore } from './store/server';

interface Props {
   preloadedState?: ServerRootState;
   children: React.ReactNode;
}

export const ServerProvider: React.FC<Props> = ({
   preloadedState,
   children,
}) => {
   const store = initializeServerStore(preloadedState);

   setupListeners(store.dispatch);

   return <Provider store={store}>{children}</Provider>;
};

export const ClientProvider: React.FC<Props> = ({
   children,
}: Omit<Props, 'preloadedState'>) => {
   return (
      <Provider context={ClientContext} store={clientStore}>
         <PersistGate loading={null} persistor={persistor}>
            {children}
         </PersistGate>
      </Provider>
   );
};
