import { Prisma, CheckIn } from '@prisma/client';
import { randomUUID } from 'crypto';

import { CheckInsRepository } from '@/repositories/check-ins-repository';
import dayjs from 'dayjs';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async findByUserId(userId: string, checkInDate: Date) {
    const startOfTheDay = dayjs(checkInDate).startOf('date');
    const endOfTheDay = dayjs(checkInDate).endOf('date');

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isBefore(startOfTheDay) && checkInDate.isAfter(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
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
