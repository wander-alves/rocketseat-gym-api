import { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  request.jwtVerify();

  console.log(request.user);

  reply.send({
    message: 'Profile',
  });
}
