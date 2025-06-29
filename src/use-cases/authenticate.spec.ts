import { describe, it, expect, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';

import { AuthenticateUseCase } from './authenticate';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(inMemoryUsersRepository);
  });

  it('should be able to authenticate', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('strongone', 6),
    });

    const { user } = await sut.execute({
      email: 'john.doe@example.com',
      password: 'strongone',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('strongone', 6),
    });

    await expect(async () => {
      await sut.execute({
        email: 'jason.doe@example.com',
        password: 'strongone',
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('strongone', 6),
    });

    await expect(async () => {
      await sut.execute({
        email: 'john.doe@example.com',
        password: 'strongon',
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
