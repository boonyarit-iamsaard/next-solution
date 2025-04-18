import { type Config } from 'drizzle-kit';

import { env } from '@/core/configs/env.config';

export default {
  schema: './src/core/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
