import { prisma } from '@/lib/prisma.js';
import 'dotenv/config';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import type { Environment } from 'vitest/environments';

function generateDatabaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please, provide a DATABASE_URL environment variable');
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set('schema', schemaId);

  return url.toString();
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schemaId = randomUUID();
    const databaseUrl = generateDatabaseUrl(schemaId);

    process.env.DATABASE_URL = databaseUrl;

    execSync('npx prisma migrate deploy');
    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`,
        );

        await prisma.$disconnect();
      },
    };
  },
};
