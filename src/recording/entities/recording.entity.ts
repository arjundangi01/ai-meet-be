import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Recording {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  fileUrl: string;

  @Field(() => String, { nullable: true })
  transcript: string;

  @Field(() => String, { nullable: true })
  summary: string;

  @Field(() => String)
  userMeetingId: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
