import { CheckIn, Prisma } from '@prisma/client';

export interface CheckInsRepository {
  findByUserIdOnDate(
    userId: string,
    checkInDate: Date,
  ): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}
