import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateGoogleBotDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the meeting to join',
    example: '1234567890',
  })
  meetingId: string;
}
