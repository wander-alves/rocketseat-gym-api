import { CheckIn, Prisma } from '@prisma/client';

export interface CheckInsRepository {
  findByUserIdOnDate(
    userId: string,
    checkInDate: Date,
  ): Promise<CheckIn | null>;
  findById(checkInId: string): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  countByUserId(userId: string): Promise<number>;
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  save(checkIn: CheckIn): Promise<CheckIn>;
}
