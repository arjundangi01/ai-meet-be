import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GoogleMeetBot } from './google-meet.service';
import { CreateGoogleBotDto } from './dto/create-google-meet.dto';
import { UpdateGoogleMeetDto } from './dto/update-google-meet.dto';

@Controller('google-meet')
export class GoogleMeetController {
  constructor(private readonly googleMeetBot: GoogleMeetBot) {}

  @Post('start')
  async start(@Body() createGoogleBotDto: CreateGoogleBotDto) {
    const sessionId = `${createGoogleBotDto.meetingId}-${Date.now()}`;
    // const bot = await this.googleMeetBot.start(sessionId, {
    //   meetingId: createGoogleBotDto.meetingId,
    //   onTranscript: (sessionId: string, transcript: any) => {
    //     console.log(sessionId, transcript);
    //   },
    //   onSessionEnd: (sessionId: string, error: any) => {
    //     console.log(sessionId, error);
    //   },
    // });
    await this.googleMeetBot.startBotV2();
    return {
      sessionId,
    };
  }
}
