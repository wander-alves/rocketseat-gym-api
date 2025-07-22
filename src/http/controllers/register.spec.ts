import { app } from '@/app.ts';
import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';

describe('Register (E2E', () => {
  beforeAll(async () => {
    await app.ready();
  });

  it('should be able to register an account', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'strongpassword',
    });

    expect(response.statusCode).toEqual(201);
  });
});
