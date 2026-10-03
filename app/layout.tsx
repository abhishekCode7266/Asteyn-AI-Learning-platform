import type {Metadata} from 'next';
import './globals.css';
import { Providers } from './providers';
import DevTools from '@/components/DevTools';

export const metadata: Metadata = {
  title: 'Astryn Learning Platform',
  description: 'AI-driven, personalized learning universe identifying weak concepts and providing multilingual AI doubt solving and comprehensive 1000+ digital library.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased" suppressHydrationWarning>
        <Providers>
          {children}
          <DevTools />
        </Providers>
      </body>
    </html>
  );
}
