import './globals.css';
import { Metadata } from 'next';
import { ClientProvider } from '@/redux/provider';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Player from './player';
import Sider from './sider';
import Queue from './queue';

export const metadata: Metadata = {
   title: 'Create Next App',
   description: 'Generated by create next app',
};

const poppins = Poppins({
   subsets: ['latin'],
   variable: '--font-sans',
   weight: ['500'],
});

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang='en'>
         <body className={`font-sans ${poppins.variable}`}>
            <ClientProvider>
               <ThemeProvider
                  attribute='class'
                  defaultTheme='dark'
                  enableSystem
               >
                  <main className='relative flex flex-col'>
                     <Queue />
                     <div className='flex'>
                        <Sider />
                        {children}
                     </div>
                     <Player />
                  </main>
               </ThemeProvider>
            </ClientProvider>
         </body>
      </html>
   );
}
