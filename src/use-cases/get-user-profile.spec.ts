import { describe, it, expect, beforeEach } from 'vitest';

import { hash } from 'bcryptjs';

import { GetUserProfileUseCase } from '@/use-cases/get-user-profile';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(inMemoryUsersRepository);
  });

  it('should be able to get user profile', async () => {
    const { id } = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('strongone', 6),
    });

    const { user } = await sut.execute({ id });

    expect(user.name).toBe('John Doe');
  });

  it('should not be able to authenticate with wrong email', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('strongone', 6),
    });

    await expect(async () => {
      await sut.execute({ id: 'non-existing-id' });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
