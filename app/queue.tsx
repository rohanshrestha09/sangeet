'use client';

import Image from 'next/image';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { BsMusicNote, BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { useClientAppDispatch, useClientAppSelector } from '@/redux/hooks';
import { pause, playSong } from '@/redux/features/musicSlice';

export default function Queue() {
   const dispatch = useClientAppDispatch();

   const { isPlaying, currentPlaying, queue } = useClientAppSelector(
      (state) => state.musicReducer
   );

   return (
      <div className='fixed right-0 top-[15%] flex h-[65vh] w-[500px] translate-x-[370px] flex-col rounded-s bg-black shadow-primary transition-all duration-500 hover:translate-x-0'>
         <div className='flex items-center justify-between border-b border-b-primary/20 px-5 py-3'>
            <span>Queue</span>
            <Button className='rounded-full'>Clear</Button>
         </div>

         <div className='flex flex-col'>
            {queue.map((song) => (
               <div
                  key={song.id}
                  className='group flex items-center justify-between px-4 py-4 hover:bg-primary/10'
               >
                  <div className='flex items-center gap-4'>
                     <BsMusicNote className='text-lg group-hover:hidden' />

                     {currentPlaying?.id === song.id && isPlaying ? (
                        <BsPauseFill
                           className='hidden cursor-pointer text-lg group-hover:block'
                           onClick={() => dispatch(pause())}
                        />
                     ) : (
                        <BsPlayFill
                           className='hidden cursor-pointer text-lg group-hover:block'
                           onClick={() => dispatch(playSong(song))}
                        />
                     )}

                     <div className='relative h-10 w-10'>
                        <Image
                           alt='image'
                           className='rounded-sm'
                           src={song?.image?.[2]?.link}
                           fill
                        />
                     </div>

                     <div className='flex flex-col gap-0.5'>
                        <span className='text-base'>{song?.name}</span>

                        <span className='text-sm text-primary/60 group-hover:text-primary'>
                           {song?.primaryArtists}
                        </span>
                     </div>
                  </div>

                  <span className='text-base text-primary/60 group-hover:text-primary'>
                     {moment.utc(Number(song?.duration) * 1000).format('mm:ss')}
                  </span>
               </div>
            ))}
         </div>
      </div>
   );
}
