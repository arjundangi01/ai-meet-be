import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  createPaginatedResponse,
  PaginatedFilter,
} from 'src/lib/common/dto/paginated-filter';
import { UserMeeting } from '../entities/user-meeting.entity';

@InputType()
export class GetUserMeetingsInput extends PaginatedFilter {
  @Field(() => String, { nullable: true })
  meetingId?: string;
}

@ObjectType()
export class PaginatedUserMeetingResponse extends createPaginatedResponse<UserMeeting>(
  UserMeeting,
) {}
