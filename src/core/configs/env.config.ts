import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const DATABASE_LOG_LEVELS = ['info', 'query', 'error', 'warn'] as const;
export type DatabaseLogLevel = (typeof DATABASE_LOG_LEVELS)[number];

export const env = createEnv({
  server: {
    APP_NAME: z.string(),
    APP_TIMEZONE: z.string(),
    APP_URL: z.string().url(),

    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string().url(),

    DATABASE_LOG_LEVELS: z.preprocess(
      (value) =>
        typeof value === 'string'
          ? value.split(',').map((level) => level.trim())
          : value,
      z.array(z.enum(DATABASE_LOG_LEVELS)).min(1),
    ),
    DATABASE_URL: z.string().url(),

    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
  },

  client: {
    NEXT_PUBLIC_APP_NAME: z.string(),
    NEXT_PUBLIC_APP_TIMEZONE: z.string(),
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },

  runtimeEnv: {
    /**
     * Server-side environment variables
     */
    APP_NAME: process.env.APP_NAME,
    APP_TIMEZONE: process.env.APP_TIMEZONE,
    APP_URL: process.env.APP_URL,

    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,

    DATABASE_LOG_LEVELS: process.env.DATABASE_LOG_LEVELS,
    DATABASE_URL: process.env.DATABASE_URL,

    NODE_ENV: process.env.NODE_ENV,

    /**
     * Client-side environment variables
     */
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_TIMEZONE: process.env.NEXT_PUBLIC_APP_TIMEZONE,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
