import '@/common/globals.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { fontSans } from '@/common/fonts';
import { cn } from '@/common/helpers/cn';

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'Next Solution',
  description: 'A Next.js starter kit for your next solution',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-background min-h-svh font-sans antialiased',
          fontSans.variable,
        )}
      >
        <div className="bg-background relative flex min-h-svh flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
