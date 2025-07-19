import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  const defaultError = 'Invalid environment variables';
  console.log(defaultError, _env.error.format());

  throw new Error(defaultError);
}

export const env = _env.data;
