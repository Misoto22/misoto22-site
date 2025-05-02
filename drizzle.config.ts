import type { Config } from 'drizzle-kit';

export default {
  schema: './src/lib/db.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'ep-cool-unit-a1vasf2g-pooler.ap-southeast-1.aws.neon.tech',
    user: 'neondb_owner',
    password: '93EzGDgKtyMj',
    database: 'neondb',
    ssl: 'require',
  },
} satisfies Config; 