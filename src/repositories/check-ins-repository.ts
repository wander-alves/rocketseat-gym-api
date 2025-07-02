import { CheckIn, Prisma } from '@prisma/client';

export interface CheckInsRepository {
  findByUserId(userId: string, checkInDate: Date): Promise<CheckIn | null>;
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}
