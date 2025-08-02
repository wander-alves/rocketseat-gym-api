import { verifyJWT } from '@/http/middlewares/verify-jwt.ts';
import { FastifyInstance } from 'fastify';
import { create } from './create.ts';
import { validate } from '@/http/controllers/check-ins/validate.ts';
import { metrics } from '@/http/controllers/check-ins/metrics.ts';
import { history } from '@/http/controllers/check-ins/history.ts';
import { verifyUserRole } from '@/http/middlewares/verify-user-role.ts';

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.post('/gyms/:gymId/check-ins', create);
  app.patch('/check-ins/:checkInId/validate', validate);

  app.get(
    '/check-ins/metrics',
    { onRequest: verifyUserRole('ADMIN') },
    metrics,
  );
  app.get('/check-ins/history', history);
}
