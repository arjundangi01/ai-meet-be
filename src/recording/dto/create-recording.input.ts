import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRecordingInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
