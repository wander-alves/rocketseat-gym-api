import { FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/register';
import { authenticate } from '@/http/controllers/authenticate';
import { profile } from './controllers/profile';

export async function appRoutes(app: FastifyInstance) {
  // Public
  app.post('/users', register);
  app.post('/sessions', authenticate);

  // Private
  app.get('/me', profile);
}
