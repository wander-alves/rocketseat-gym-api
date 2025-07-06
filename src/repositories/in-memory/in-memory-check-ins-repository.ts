import { Prisma, CheckIn } from '@prisma/client';
import { randomUUID } from 'crypto';

import { CheckInsRepository } from '@/repositories/check-ins-repository';
import dayjs from 'dayjs';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, checkInDate: Date) {
    const startOfTheDay = dayjs(checkInDate).startOf('date');
    const endOfTheDay = dayjs(checkInDate).endOf('date');

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async findManyByUserId(userId: string, page: number) {
    const perPage = 20;
    const minIndex = (page - 1) * perPage;
    const maxIndex = page * perPage;

    const checkIns = this.items
      .filter((item) => item.user_id === userId)
      .slice(minIndex, maxIndex);

    return checkIns;
  }

  async countByUserId(userId: string) {
    const checkInsCount = this.items.filter(
      (item) => item.user_id === userId,
    ).length;

    return checkInsCount;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
