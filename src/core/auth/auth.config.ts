import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { z } from 'zod';

import { db } from '@/core/database/database.client';
import { ROLES } from '@/core/database/schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    // TODO: disable auto sign-in when seeding users
    autoSignIn: false,
  },
  plugins: [nextCookies()],
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'USER',
        validator: {
          input: z.enum(ROLES),
          output: z.enum(ROLES),
        },
      },
    },
  },
});

export type AuthConfig = typeof auth;

export type AuthServerSession = typeof auth.$Infer.Session;
