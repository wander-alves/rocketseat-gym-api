import { app } from '@/app.ts';
import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';

describe('Profile (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  it('should be able to get account profile', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'strongpassword',
    });

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'john.doe@example.com',
      password: 'strongpassword',
    });
    const { token } = authResponse.body;

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: 'john.doe@example.com',
      }),
    );
  });
});
