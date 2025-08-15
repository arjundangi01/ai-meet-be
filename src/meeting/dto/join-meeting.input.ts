import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JoinMeetingInput {
  @Field(() => String, { description: 'The ID of the meeting to join' })
  meetingId: string;
}
