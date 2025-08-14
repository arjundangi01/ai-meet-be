import { Injectable } from '@nestjs/common';
import { CreateRecordingInput } from './dto/create-recording.input';
import { UpdateRecordingInput } from './dto/update-recording.input';
import { GetRecordingsInput } from './dto/get-recording.input';
import { constructServicePaginationOptions } from 'src/lib/utils/serviceUtils/paginationOptions';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/db.service';

@Injectable()
export class RecordingService {
  constructor(private readonly prisma: PrismaService) {}
  create(createRecordingInput: CreateRecordingInput) {
    return 'This action adds a new recording';
  }

  async findAll(input: GetRecordingsInput) {
    const { cursorOptions, orderByOptions, shouldPaginate, take } =
      constructServicePaginationOptions<
        Prisma.RecordingWhereUniqueInput,
        Prisma.RecordingOrderByWithRelationInput
      >({
        after: input.after,
        before: input.before,
        limit: input.first || input.last,
      });

    const [recordings, total] = await Promise.all([
      this.prisma.recording.findMany({
        ...(shouldPaginate && {
          take,
          cursor: cursorOptions,
          skip: cursorOptions ? 1 : undefined,
        }),
        orderBy: orderByOptions,
      }),
      this.prisma.recording.count({}),
    ]);
    return {
      recordings,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} recording`;
  }

  update(id: number, updateRecordingInput: UpdateRecordingInput) {
    return `This action updates a #${id} recording`;
  }

  remove(id: number) {
    return `This action removes a #${id} recording`;
  }
}
