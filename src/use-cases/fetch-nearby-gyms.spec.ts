import { describe, it, expect, beforeEach } from 'vitest';

import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(inMemoryGymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'Near Gym',
      description: '',
      phone: '',
      latitude: -23.668619,
      longitude: -46.6509271,
    });

    await inMemoryGymsRepository.create({
      title: 'Far Gym',
      description: '',
      phone: '',
      latitude: -23.5332373,
      longitude: -46.7187936,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.668619,
      userLongitude: -46.6509271,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
  });
});
