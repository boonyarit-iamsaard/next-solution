import { Role } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { z } from 'zod';

import { db } from '@/core/database/database.client';

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
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
        defaultValue: Role.USER,
        validator: {
          input: z.nativeEnum(Role),
          output: z.nativeEnum(Role),
        },
      },
    },
  },
});

export type AuthConfig = typeof auth;

export type AuthServerSession = typeof auth.$Infer.Session;
