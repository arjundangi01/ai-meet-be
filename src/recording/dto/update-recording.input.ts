import { CreateRecordingInput } from './create-recording.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRecordingInput extends PartialType(CreateRecordingInput) {
  @Field(() => Int)
  id: number;
}
