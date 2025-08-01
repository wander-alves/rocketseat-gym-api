import { FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/users/register';
import { authenticate } from '@/http/controllers/users/authenticate';
import { profile } from './profile';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { refresh } from '@/http/controllers/users/refresh.ts';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);
  app.patch('/refresh', refresh);

  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
