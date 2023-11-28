'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Howl } from 'howler';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FaCirclePlay, FaCirclePause } from 'react-icons/fa6';
import { BsShuffle, BsRepeat } from 'react-icons/bs';
import { IoIosSkipBackward, IoIosSkipForward } from 'react-icons/io';
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from 'react-icons/hi2';
import { useClientAppDispatch, useClientAppSelector } from '@/redux/hooks';
import {
   disableRepeat,
   disableShuffle,
   enableRepeat,
   enableShuffle,
   mute,
   next,
   pause,
   play,
   previous,
   seek,
   setVolume,
   unmute,
} from '@/redux/features/musicSlice';
import { cn } from '@/lib/utils';

export default function Player() {
   const dispatch = useClientAppDispatch();

   const {
      currentPlaying,
      isPlaying,
      isMuted,
      nextSong,
      onShuffle,
      onRepeat,
      previousSong,
      seekValue,
      volume,
   } = useClientAppSelector((state) => state.musicReducer);

   const [sound, setSound] = useState<Howl | null>(null);

   const [sliderSeekValue, setSliderSeekValue] = useState(seekValue);

   useEffect(() => {
      if (sound) {
         sound.unload();
         dispatch(seek(0));
      }

      if (!currentPlaying) dispatch(pause());
      else
         setSound(
            new Howl({
               src: [currentPlaying?.downloadUrl?.[4]?.link],
               html5: true,
               onend: () => {
                  dispatch(seek(0));

                  if (nextSong) dispatch(next());
                  else dispatch(pause());
               },
            })
         );

      return () => {
         if (sound) sound.unload();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentPlaying]);

   useEffect(() => {
      if (!isPlaying) return;

      const id = setInterval(
         () => setSliderSeekValue((prev) => prev + 0.1),
         100
      );

      return () => clearInterval(id);
   }, [isPlaying]);

   useEffect(() => {
      sound?.mute(isMuted);
   }, [sound, isMuted]);

   useEffect(() => {
      sound?.volume(volume);
   }, [sound, volume]);

   useEffect(() => {
      isPlaying ? sound?.play() : sound?.pause();
   }, [sound, isPlaying]);

   // useEffect(() => {
   //    sound?.loop(onRepeat);
   // }, [sound, onRepeat]);

   useEffect(() => {
      sound?.seek(seekValue);
      setSliderSeekValue(seekValue);
   }, [sound, seekValue]);

   useEffect(() => {
      return () => {
         dispatch(pause());
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className='group fixed bottom-0 flex w-full flex-col bg-black'>
         <Slider
            disabled={!currentPlaying}
            max={Number(currentPlaying?.duration)}
            min={0}
            value={[sliderSeekValue]}
            onValueChange={(v) => dispatch(seek(v?.[0]))}
         />

         <div className='grid w-full grid-cols-3 items-center gap-6 p-4'>
            <div className='flex items-center gap-4'>
               <div className='relative h-14 w-14'>
                  {currentPlaying ? (
                     <Image
                        alt='image'
                        className='rounded-sm'
                        src={currentPlaying?.image?.[2]?.link}
                        fill
                     />
                  ) : (
                     <Avatar className='h-14 w-14 rounded-sm'>
                        <AvatarFallback className='rounded-sm'>
                           &#9834;
                        </AvatarFallback>
                     </Avatar>
                  )}
               </div>
               <div className='flex flex-col gap-0.5'>
                  <span className='text-base'>{currentPlaying?.name}</span>

                  <div className='flex gap-1 text-sm text-primary/60'>
                     <span className='cursor-pointer hover:underline'>
                        {currentPlaying?.primaryArtists}
                     </span>
                     <span>•</span>
                     <span className='cursor-pointer hover:underline'>
                        {currentPlaying?.album.name}
                     </span>
                     <span>•</span>
                     <span>{currentPlaying?.year}</span>
                  </div>
               </div>
            </div>

            <div className='flex items-center justify-center gap-6'>
               <div className='relative flex flex-col items-center'>
                  <BsShuffle
                     className={cn(
                        'h-5 w-5 cursor-pointer hover:text-primary',
                        onShuffle ? 'text-primary' : 'text-primary/70'
                     )}
                     onClick={() =>
                        dispatch(onShuffle ? disableShuffle() : enableShuffle())
                     }
                  />
                  {onShuffle && (
                     <span className='absolute top-4 text-sm'>•</span>
                  )}
               </div>

               <IoIosSkipBackward
                  className={cn(
                     'h-7 w-7 text-primary/70',
                     previousSong
                        ? 'cursor-pointer hover:text-primary'
                        : 'cursor-default'
                  )}
                  onClick={() => {
                     if (previousSong) dispatch(previous());
                  }}
               />

               {isPlaying ? (
                  <FaCirclePause
                     className={cn(
                        'h-9 w-9 cursor-pointer',
                        currentPlaying ? 'cursor-pointer' : 'cursor-default'
                     )}
                     onClick={() => {
                        if (currentPlaying) dispatch(pause());
                     }}
                  />
               ) : (
                  <FaCirclePlay
                     className={cn(
                        'h-9 w-9 cursor-pointer',
                        currentPlaying ? 'cursor-pointer' : 'cursor-default'
                     )}
                     onClick={() => {
                        if (currentPlaying) dispatch(play());
                     }}
                  />
               )}

               <IoIosSkipForward
                  className={cn(
                     'h-7 w-7 text-primary/70',
                     nextSong
                        ? 'cursor-pointer hover:text-primary'
                        : 'cursor-default'
                  )}
                  onClick={() => {
                     if (nextSong) dispatch(next());
                  }}
               />

               <div className='relative flex flex-col items-center'>
                  <BsRepeat
                     className={cn(
                        'h-5 w-5 cursor-pointer hover:text-primary',
                        onRepeat ? 'text-primary' : 'text-primary/70'
                     )}
                     onClick={() =>
                        dispatch(onRepeat ? disableRepeat() : enableRepeat())
                     }
                  />
                  {onRepeat && (
                     <span className='absolute top-4 text-sm'>•</span>
                  )}
               </div>
            </div>

            <div className='flex w-full items-center justify-end gap-6'>
               <span className='text-xs text-primary/70'>
                  {`${
                     currentPlaying
                        ? moment.utc(sliderSeekValue * 1000).format('mm:ss')
                        : '--:--'
                  } / 
                  ${
                     currentPlaying
                        ? moment
                             .utc(Number(currentPlaying?.duration) * 1000)
                             .format('mm:ss')
                        : '--:--'
                  }`}
               </span>

               <div className='flex items-center gap-2.5'>
                  {isMuted ? (
                     <HiOutlineSpeakerXMark
                        className='h-5 w-5 cursor-pointer text-primary/70 hover:text-primary'
                        onClick={() => dispatch(unmute())}
                     />
                  ) : (
                     <HiOutlineSpeakerWave
                        className='h-5 w-5 cursor-pointer text-primary/70 hover:text-primary'
                        onClick={() => dispatch(mute())}
                     />
                  )}

                  <Slider
                     className='w-24'
                     max={1}
                     min={0}
                     step={0.01}
                     value={[volume]}
                     onValueChange={(v) => dispatch(setVolume(v?.[0]))}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
