import { describe, it, expect, beforeEach } from 'vitest';

import { GetUserMetricsUseCase } from './get-user-metrics';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(inMemoryCheckInsRepository);
  });

  it('should be able to get user check-ins count from metrics', async () => {
    await inMemoryCheckInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    });

    await inMemoryCheckInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    });

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    });

    expect(checkInsCount).toEqual(2);
  });
});
