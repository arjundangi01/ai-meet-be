import { ObjectType, Field, Int, DateScalarMode } from '@nestjs/graphql';
import { Meeting } from 'src/meeting/entities/meeting.entity';

@ObjectType()
export class UserMeeting {
  @Field(() => String)
  id: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  meetingId: string;

  @Field(() => String, { nullable: true })
  fileUrl?: string;

  @Field(() => String, { nullable: true })
  transcript?: string;

  @Field(() => String, { nullable: true })
  summary?: string;

  @Field(() => String, { nullable: true })
  containerId?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  participants?: string;

  @Field(() => Meeting, { nullable: true })
  meeting?: Meeting;
}
