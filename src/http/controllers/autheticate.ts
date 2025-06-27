import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

import { AuthenticateUseCase } from '@/use-cases/authenticate';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(200).send();
}
