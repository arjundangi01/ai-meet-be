import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Meeting {
  @Field(() => String, { description: 'Example field (placeholder)' })
  id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  googleId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
