import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { betterFetch } from '@better-fetch/fetch';

import type { AuthServerSession } from '@/core/auth/auth.config';

/*
 * TODO: back to consult with better-auth docs
 * see: https://better-auth.vercel.app/docs/integrations/next#for-nextjs-release-1520-and-above
 */
export async function middleware(request: NextRequest) {
  // TODO: replace better-fetch with react-query when tRPC implemented
  const { data: session } = await betterFetch<AuthServerSession>(
    '/api/auth/get-session',
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get('cookie') ?? '',
      },
    },
  );

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
