import { PartialType } from '@nestjs/mapped-types';
import { CreateChatterBoxDto } from './create-chatter-box.dto';

export class UpdateChatterBoxDto extends PartialType(CreateChatterBoxDto) {}
