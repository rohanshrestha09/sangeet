export const debounce = <T>(fn: (v: T) => void, wait: number) => {
   let timeout: NodeJS.Timeout | null = null;

   return (v: T) => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
         fn(v);
      }, wait);
   };
};
