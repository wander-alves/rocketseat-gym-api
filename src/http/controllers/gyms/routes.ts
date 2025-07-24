import { FastifyInstance } from 'fastify';

import { createGyms } from '@/http/controllers/gyms/create-gym.ts';
import { verifyJWT } from '@/http/middlewares/verify-jwt.ts';

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.post('/gyms', createGyms);
}
