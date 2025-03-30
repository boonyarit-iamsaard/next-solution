import { headers } from 'next/headers';
import Link from 'next/link';

import { Button } from '@/common/components/ui/button';
import { auth } from '@/core/auth/auth.config';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="bg-muted flex h-[35vh] flex-col items-center justify-center gap-4">
      <div className="container flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-2xl font-bold">
          A Next.js starter kit for your next solution
        </h1>
        {!session ? (
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        ) : null}
      </div>
    </section>
  );
}
