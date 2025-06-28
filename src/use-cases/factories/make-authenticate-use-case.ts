import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUseCase } from '../authenticate';

export function makeAuthenticateUseCase() {
  const prismaUsersUseCase = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersUseCase);

  return authenticateUseCase;
}
