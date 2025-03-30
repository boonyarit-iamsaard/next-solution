import { headers } from 'next/headers';
import Link from 'next/link';

import { Button } from '@/common/components/ui/button';
import { auth } from '@/core/auth/auth.config';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  async function handleSignOut() {
    'use server';
    await auth.api.signOut({ headers: await headers() });
  }

  return (
    <main className="flex-1">
      <div className="flex min-h-svh flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">
          A Next.js starter kit for your next solution
        </h1>
        {session ? (
          <>
            <p className="text-muted-foreground text-sm text-balance">
              {session.user.email}
            </p>
            <form action={handleSignOut}>
              <Button type="submit">Sign out</Button>
            </form>
          </>
        ) : (
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        )}
      </div>
    </main>
  );
}
