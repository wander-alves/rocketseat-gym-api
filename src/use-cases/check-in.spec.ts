import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

import { CheckInUseCase } from './check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Check-in Use Case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(inMemoryCheckInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2025, 0, 31, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    await expect(async () => {
      await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it.only('should be able to check in twice, but in differente days', async () => {
    vi.setSystemTime(new Date(2025, 0, 31, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    vi.setSystemTime(new Date(2025, 1, 1, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
