import { CreateUserMeetingInput } from './create-user-meeting.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserMeetingInput extends PartialType(CreateUserMeetingInput) {
  @Field(() => Int)
  id: number;
}
