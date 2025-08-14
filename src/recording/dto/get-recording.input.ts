import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  createPaginatedResponse,
  PaginatedFilter,
} from 'src/lib/common/dto/paginated-filter';
import { Recording } from '../entities/recording.entity';

@InputType()
export class GetRecordingsInput extends PaginatedFilter {
  @Field(() => String, { nullable: true })
  meetingId?: string;
}

@ObjectType()
export class PaginatedRecordingResponse extends createPaginatedResponse<Recording>(
  Recording,
) {}
