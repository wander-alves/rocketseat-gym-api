import { CheckIn, Prisma } from '@prisma/client';
import { CheckInsRepository } from '../check-ins-repository';
import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string) {
    const user = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByUserIdOnDate(userId: string, checkInDate: Date) {
    const startOfTheDate = dayjs(checkInDate).startOf('date');
    const endOfTheDate = dayjs(checkInDate).startOf('date');

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDate.toDate(),
          lte: endOfTheDate.toDate(),
        },
      },
    });

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number) {
    const perPage = 20;
    const minIndex = (page - 1) * perPage;
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: perPage,
      skip: minIndex,
    });

    return checkIns;
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });

    return checkIn;
  }
}
