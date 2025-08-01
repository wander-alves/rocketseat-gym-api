import { FastifyRequest, FastifyReply } from 'fastify';

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({ onlyCookie: true });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: request.user.sub,
        },
      },
    );
    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: request.user.sub,
          expiresIn: '7d',
        },
      },
    );

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: true,
      })
      .send({ token });
  } catch (error) {
    console.log(error);
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
    throw error;
  }
}
