import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserMeetingInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
