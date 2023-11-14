import { withHydration } from '@/redux/withHydration';
import Home from '.';

export default withHydration(Home, async (store) => {
   return store.getState();
});
