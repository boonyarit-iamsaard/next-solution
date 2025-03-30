import Link from 'next/link';

import { TerminalSquareIcon } from 'lucide-react';

import { UserMenu } from '@/common/components/layout/user-menu';

export function AppHeader() {
  return (
    <header className="border-grid bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex w-full items-center border-b backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <Link href="/" className="flex gap-2 font-medium">
              <TerminalSquareIcon className="size-6" />
              Next Solution
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
