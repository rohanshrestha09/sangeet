import { withHydration } from '@/redux/withHydration';
import { songApi } from '@/redux/services/songApi';
import Home from '.';

export default withHydration(Home, async (store) => {
   await store.dispatch(
      songApi.endpoints.getSongsById.initiate(['5WXAlMNt', 'csaEsVWV'])
   );

   return store.getState();
});
