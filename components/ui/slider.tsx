'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

const Slider = React.forwardRef<
   React.ElementRef<typeof SliderPrimitive.Root>,
   React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
   <SliderPrimitive.Root
      ref={ref}
      className={cn(
         'relative flex h-0.5 w-full touch-none select-none items-center',
         className
      )}
      {...props}
   >
      <SliderPrimitive.Track className='relative h-0.5 w-full grow cursor-pointer overflow-hidden rounded-full bg-primary/20 group-hover:h-1'>
         <SliderPrimitive.Range className='absolute h-full bg-primary' />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className='hidden h-3 w-3 cursor-pointer rounded-full border border-primary bg-primary shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 group-hover:block' />
   </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
