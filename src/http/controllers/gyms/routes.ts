import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt.ts';
import { create } from '@/http/controllers/gyms/create';
import { search } from '@/http/controllers/gyms/search';
import { nearby } from '@/http/controllers/gyms/nearby';

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.post('/gyms', create);
  app.get('/gyms/search', search);
  app.get('/gyms/nearby', nearby);
}
