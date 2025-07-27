import { PartialType } from '@nestjs/swagger';
import { CreateGoogleBotDto } from './create-google-meet.dto';

export class UpdateGoogleMeetDto extends PartialType(CreateGoogleBotDto) {}
