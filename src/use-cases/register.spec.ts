import { compare } from 'bcryptjs';
import { describe, it, expect } from 'vitest';
import { RegisterUseCase } from './register';

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        console.log(email);
        return null;
      },
      async create(data) {
        return {
          id: 'user-01',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

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
});
