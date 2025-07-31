import { app } from '@/app.ts';
import { prisma } from '@/lib/prisma.ts';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user.ts';
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('Check-ins Metrics (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get the count of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const { id: gym_id } = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: '',
        phone: '',
        latitude: -23.668619,
        longitude: -46.6509271,
      },
    });

    const { id: user_id } = await prisma.user.findFirstOrThrow();

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id,
          user_id,
        },
        {
          gym_id,
          user_id,
        },
      ],
    });

    const response = await request(app.server)
      .post('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send({
        gym_id,
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body.checkIns).toEqual(2);
  });
});
