import { describe, it, expect, beforeEach } from 'vitest';

import { CreateGymUseCase } from './create-gym';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(inMemoryGymsRepository);
  });

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -23.668619,
      longitude: -46.6509271,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
