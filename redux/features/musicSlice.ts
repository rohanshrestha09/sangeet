import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uniqBy } from 'lodash';
import { TEST_SOUND } from '@/constants';
import { Song } from '@/interface/models';

type MusicState = {
   queue: Song[];
   currentPlaying: Song | null;
   nextSong: Song | null;
   previousSong: Song | null;
   seekValue: number;
   isPlaying: boolean;
   isMuted: boolean;
   onShuffle: boolean;
   onRepeat: boolean;
   volume: number;
};

const initialState = {
   queue: [TEST_SOUND],
   currentPlaying: TEST_SOUND,
   nextSong: null,
   previousSong: null,
   seekValue: 0,
   isPlaying: false,
   isMuted: false,
   onShuffle: false,
   onRepeat: false,
   volume: 1,
} as MusicState;

export const music = createSlice({
   name: 'music',
   initialState,
   reducers: {
      playSong: (state, action: PayloadAction<Song>) => {
         return {
            ...state,
            isPlaying: true,
            currentPlaying: action.payload,
            nextSong:
               state.queue.length === 1 ? action.payload : state.nextSong,
            queue: uniqBy([action.payload, ...state.queue], 'id'),
         };
      },
      enqueue: (state, action: PayloadAction<Song>) => {
         return {
            ...state,
            currentPlaying: state.currentPlaying ?? action.payload,
            nextSong:
               state.queue.length === 1 ? action.payload : state.nextSong,
            queue: [...state.queue, action.payload],
         };
      },
      remove: (state, action: PayloadAction<Song>) => {
         if (state.currentPlaying?.id === action.payload.id) return;

         const previousIndex = state.queue.findIndex(
            (song) => song.id === state.previousSong?.id
         );

         const nextIndex = state.queue.findIndex(
            (song) => song.id === state.nextSong?.id
         );

         return {
            ...state,
            nextSong:
               state.nextSong?.id === action.payload.id
                  ? state.queue[nextIndex + 1] ?? null
                  : state.nextSong,
            previousSong:
               state.previousSong?.id === action.payload.id
                  ? state.queue[previousIndex - 1] ?? null
                  : state.previousSong,
            queue: state.queue.filter((song) => song.id !== action.payload.id),
         };
      },
      next: (state) => {
         if (!state.nextSong) return;

         const currentIndex = state.queue.findIndex(
            (song) => song.id === state.currentPlaying?.id
         );

         return {
            ...state,
            previousSong: state.currentPlaying,
            nextSong: state.queue[currentIndex + 1] ?? null,
            currentPlaying: state.nextSong,
         };
      },
      previous: (state) => {
         if (!state.previousSong) return;

         const currentIndex = state.queue.findIndex(
            (song) => song.id === state.currentPlaying?.id
         );

         return {
            ...state,
            nextSong: state.currentPlaying,
            previousSong: state.queue[currentIndex - 1] ?? null,
            currentPlaying: state.previousSong,
         };
      },
      play: (state) => {
         return { ...state, isPlaying: true };
      },
      pause: (state) => {
         return { ...state, isPlaying: false };
      },
      seek: (state, action: PayloadAction<number>) => {
         return { ...state, seekValue: action.payload };
      },
      mute: (state) => {
         return { ...state, isMuted: true };
      },
      unmute: (state) => {
         return { ...state, isMuted: false };
      },
      setVolume: (state, action: PayloadAction<number>) => {
         return { ...state, volume: action.payload };
      },
      enableShuffle: (state) => {
         return { ...state, onShuffle: true };
      },
      disableShuffle: (state) => {
         return { ...state, onShuffle: false };
      },
      enableRepeat: (state) => {
         return { ...state, onRepeat: true };
      },
      disableRepeat: (state) => {
         return { ...state, onRepeat: false };
      },
   },
});

export const {
   play,
   pause,
   playSong,
   enqueue,
   next,
   previous,
   seek,
   mute,
   unmute,
   enableShuffle,
   disableShuffle,
   enableRepeat,
   disableRepeat,
   setVolume,
} = music.actions;

export default music.reducer;
