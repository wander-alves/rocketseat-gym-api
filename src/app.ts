import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { ZodError } from 'zod';

import { appRoutes } from '@/http/routes';
import { env } from './env';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.SECRET,
});

app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO Send app error logs to an external source like Data Dog, ELK, NewRelic, Sentry.
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  });
});
