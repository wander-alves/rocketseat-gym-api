import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.');
  }

  const hashSaltRounds = 6;
  const password_hash = await hash(password, hashSaltRounds);

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
}
