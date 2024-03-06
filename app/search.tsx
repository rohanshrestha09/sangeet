'use client';

import { useDeferredValue, useEffect } from 'react';
import {
   CalendarIcon,
   EnvelopeClosedIcon,
   FaceIcon,
   GearIcon,
   PersonIcon,
   RocketIcon,
} from '@radix-ui/react-icons';
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
   CommandSeparator,
   CommandShortcut,
} from '@/components/ui/command';
import { isEmpty } from 'lodash';
import { useClientAppDispatch, useClientAppSelector } from '@/redux/hooks';
import { useLazyGetSearchResultsQuery } from '@/redux/services/searchApi';
import { setQuery } from '@/redux/features/musicSlice';
import { debounce } from '@/utils';

export default function Search() {
   const dispatch = useClientAppDispatch();

   const { query } = useClientAppSelector((state) => state.musicReducer);

   const deferredQuery = useDeferredValue(query);

   const [triggerSearch, { data }] = useLazyGetSearchResultsQuery();

   const initiateSearch = debounce(
      (query: string) => triggerSearch({ query }),
      3000
   );

   useEffect(() => {
      deferredQuery && initiateSearch(deferredQuery);
   }, [deferredQuery]);

   return (
      <Command
         className='fixed top-6 h-fit w-[50vw] self-center rounded-lg border shadow-md'
         shouldFilter={false}
      >
         <CommandInput
            placeholder='Type a command or search...'
            value={deferredQuery}
            onValueChange={(v) => dispatch(setQuery(v))}
         />
         <CommandList hidden={!isEmpty(data)}>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading='Songs'>
               <CommandItem>
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  <span>Calendar</span>
               </CommandItem>
               <CommandItem>
                  <FaceIcon className='mr-2 h-4 w-4' />
                  <span>Search Emoji</span>
               </CommandItem>
               <CommandItem>
                  <RocketIcon className='mr-2 h-4 w-4' />
                  <span>Launch</span>
               </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading='Albums'>
               <CommandItem>
                  <PersonIcon className='mr-2 h-4 w-4' />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
               </CommandItem>
               <CommandItem>
                  <EnvelopeClosedIcon className='mr-2 h-4 w-4' />
                  <span>Mail</span>
                  <CommandShortcut>⌘B</CommandShortcut>
               </CommandItem>
               <CommandItem>
                  <GearIcon className='mr-2 h-4 w-4' />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
               </CommandItem>
            </CommandGroup>
         </CommandList>
      </Command>
   );
}
