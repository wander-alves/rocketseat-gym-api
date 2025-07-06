import { describe, it, expect, beforeEach } from 'vitest';

import { SearchGymsUseCase } from './search-gyms';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(inMemoryGymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'JavaScript Gym 1',
      description: '',
      phone: '',
      latitude: -23.668619,
      longitude: -46.6509271,
    });

    await inMemoryGymsRepository.create({
      title: 'JavaScript Gym 2',
      description: '',
      phone: '',
      latitude: -23.668619,
      longitude: -46.6509271,
    });

    const { gyms } = await sut.execute({
      query: 'JavaScript Gym',
      page: 1,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 1' }),
      expect.objectContaining({ title: 'JavaScript Gym 2' }),
    ]);
  });

  it('should be able to search paginatedd gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: '',
        phone: '',
        latitude: -23.668619,
        longitude: -46.6509271,
      });
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript Gym',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ]);
  });
});
