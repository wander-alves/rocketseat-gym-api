import { app } from '@/app.ts';
import { prisma } from '@/lib/prisma.ts';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user.ts';
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('Create Check-in (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a check-in', async () => {
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

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id,
        user_id,
      },
    });

    const response = await request(app.server)
      .post(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        gym_id,
      });

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    });

    expect(response.statusCode).toEqual(204);
    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});
