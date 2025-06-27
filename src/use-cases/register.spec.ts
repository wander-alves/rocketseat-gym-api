import { compare } from 'bcryptjs';
import { describe, it, expect } from 'vitest';

import { RegisterUseCase } from './register';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'strongpassword',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

    const { user } = await registerUseCase.execute({
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
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

    const email = 'john.doe@example.com';

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: 'strongpassword',
    });

    await expect(async () => {
      await registerUseCase.execute({
        name: 'John Doe',
        email,
        password: 'strongpassword',
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
