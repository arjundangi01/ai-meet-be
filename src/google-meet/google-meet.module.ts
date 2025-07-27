import { Module } from '@nestjs/common';
import { GoogleMeetBot } from './google-meet.service';
import { GoogleMeetController } from './google-meet.controller';
import { PrismaModule } from 'src/db/db.module';
import { BotService } from './bot.service';

@Module({
  controllers: [GoogleMeetController],
  providers: [GoogleMeetBot, BotService],
})
export class GoogleMeetModule {}
