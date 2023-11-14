'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useClientAppDispatch, useClientAppSelector } from '@/redux/hooks';
import { useGetSongsByIdQuery } from '@/redux/services/songApi';
import { decrement, increment, reset } from '@/redux/features/counterSlice';
import { useLoginMutation } from '@/redux/services/authApi';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function Home() {
   const router = useRouter();

   const count = useClientAppSelector((state) => state.counterReducer.value);

   const dispatch = useClientAppDispatch();

   const {
      data: songs,
      isLoading,
      isFetching,
      error,
   } = useGetSongsByIdQuery(['5WXAlMNt', 'csaEsVWV']);

   const [login, { isLoading: isLoginLoading }] = useLoginMutation();

   return (
      <main className='flex flex-col gap-10 px-28 py-10'>
         <h4 className='text-center text-[20px]'>{count}</h4>
         <div className='flex items-center justify-center gap-4'>
            <Button onClick={() => dispatch(increment())}>increment</Button>
            <Button onClick={() => dispatch(decrement())}>decrement</Button>
            <Button variant='destructive' onClick={() => dispatch(reset())}>
               reset
            </Button>
            <Button
               className='bg-blue-600 text-white hover:bg-blue-500'
               onClick={() => login({})}
            >
               {isLoginLoading ? 'loading...' : 'login'}
            </Button>
            <Button onClick={() => router.push('/test')}>test</Button>
         </div>

         {error ? (
            <p>Oh no, there was an error</p>
         ) : isLoading || isFetching ? (
            <p>Loading...</p>
         ) : songs ? (
            <div className='grid grid-cols-4 gap-5'>
               {songs.map((song) => (
                  <Card key={song.id}>
                     <CardContent className='my-auto flex items-center gap-4 py-4'>
                        <Avatar>
                           <AvatarImage
                              alt={song.name}
                              src={song.image[0].link}
                           />
                           <AvatarFallback>
                              <ReloadIcon className='animate-spin' />
                           </AvatarFallback>
                        </Avatar>
                        <h3>{song.name}</h3>
                     </CardContent>
                  </Card>
               ))}
            </div>
         ) : null}
      </main>
   );
}
