import { Prisma, User } from '@prisma/client';

export interface UsersRepository {
  findById(string: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Prisma.UserCreateInput): Promise<User>;
}
