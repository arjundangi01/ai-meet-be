import { Injectable } from '@nestjs/common';
import { CreateUserMeetingInput } from './dto/create-user-meeting.input';
import { UpdateUserMeetingInput } from './dto/update-user-meeting.input';
import { GetUserMeetingsInput } from './dto/get-user-meeting.input';
import { constructServicePaginationOptions } from 'src/lib/utils/serviceUtils/paginationOptions';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/db.service';

@Injectable()
export class UserMeetingService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserMeetingInput: CreateUserMeetingInput) {
    return 'This action adds a new userMeeting';
  }

  async findAll(input: GetUserMeetingsInput, userId: string) {
    const { cursorOptions, orderByOptions, shouldPaginate, take } =
      constructServicePaginationOptions<
        Prisma.UserMeetingWhereUniqueInput,
        Prisma.UserMeetingOrderByWithRelationInput
      >({
        after: input.after,
        before: input.before,
        limit: input.first || input.last,
      });
    const where: Prisma.UserMeetingWhereInput = {
      userId,
    };

    const [userMeetings, total] = await Promise.all([
      this.prisma.userMeeting.findMany({
        where,
        ...(shouldPaginate && {
          take,
          cursor: cursorOptions,
          skip: cursorOptions ? 1 : undefined,
        }),
        orderBy: orderByOptions,
      }),
      this.prisma.userMeeting.count({ where }),
    ]);

    return {
      userMeetings,
      total,
    };
  }

  async findOne(id: string, userId: string) {
    const where: Prisma.UserMeetingWhereInput = {
      id: id,
      userId,
    };

    const userMeeting = await this.prisma.userMeeting.findFirst({
      where,
    });

    return userMeeting;
  }

  update(id: number, updateUserMeetingInput: UpdateUserMeetingInput) {
    return `This action updates a #${id} userMeeting`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMeeting`;
  }
}
