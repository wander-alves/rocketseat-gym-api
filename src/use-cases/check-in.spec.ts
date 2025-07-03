import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

import { CheckInUseCase } from './check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check-in Use Case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(
      inMemoryCheckInsRepository,
      inMemoryGymsRepository,
    );

    inMemoryGymsRepository.items.push({
      id: 'gym-01',
      title: 'BigInt',
      description: '',
      phone: '',
      latitude: new Decimal(-23.6690126),
      longitude: new Decimal(-46.650013),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.668619,
      userLongitude: -46.6509271,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2025, 0, 31, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.668619,
      userLongitude: -46.6509271,
    });

    await expect(async () => {
      await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.668619,
        userLongitude: -46.6509271,
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it.only('should be able to check in twice, but in differente days', async () => {
    vi.setSystemTime(new Date(2025, 0, 31, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.668619,
      userLongitude: -46.6509271,
    });

    vi.setSystemTime(new Date(2025, 1, 1, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.668619,
      userLongitude: -46.6509271,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it.only('should not be able to check in on distant gym', async () => {
    inMemoryGymsRepository.items.push({
      id: 'gym-02',
      title: 'Strongly Typed',
      description: 'Where we break in production',
      phone: '',
      latitude: new Decimal(-23.6690126),
      longitude: new Decimal(-46.650013),
    });

    await expect(async () => {
      await sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -23.6678308,
        userLongitude: -46.652909,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
