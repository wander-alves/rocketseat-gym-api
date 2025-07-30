import { app } from '@/app.ts';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user.ts';
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('Create Gym (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: '',
        phone: '',
        latitude: -23.668619,
        longitude: -46.6509271,
      });

    expect(response.statusCode).toEqual(201);
  });
});
