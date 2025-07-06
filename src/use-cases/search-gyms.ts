import { Gym } from '@prisma/client';

import { GymsRepository } from '@/repositories/gyms-repository';

interface SearchGymsRepositoryUseCaseRequest {
  query: string;
  page: number;
}

interface SearchGymsRepositoryUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsRepositoryUseCaseRequest): Promise<SearchGymsRepositoryUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return {
      gyms,
    };
  }
}
