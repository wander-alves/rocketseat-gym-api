import { app } from '@/app.ts';
import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';

describe('Authenticate (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  it('should be able to authenticate an account', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'strongpassword',
    });

    const response = await request(app.server).post('/sessions').send({
      email: 'john.doe@example.com',
      password: 'strongpassword',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
