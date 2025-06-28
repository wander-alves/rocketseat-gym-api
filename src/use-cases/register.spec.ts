import { compare } from 'bcryptjs';
import { describe, it, expect, beforeEach } from 'vitest';

import { RegisterUseCase } from './register';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(inMemoryUsersRepository);
  });

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'strongpassword',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'strongpassword',
    });

    const isPasswordCorrectlyHashed = await compare(
      'strongpassword',
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same e-mail twice', async () => {
    const email = 'john.doe@example.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: 'strongpassword',
    });

    await expect(async () => {
      await sut.execute({
        name: 'John Doe',
        email,
        password: 'strongpassword',
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
