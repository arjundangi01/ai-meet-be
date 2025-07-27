import { Module } from '@nestjs/common';
import { GoogleMeetBot } from './google-meet.service';
import { GoogleMeetController } from './google-meet.controller';
import { PrismaModule } from 'src/db/db.module';

@Module({
  controllers: [GoogleMeetController],
  providers: [GoogleMeetBot],
})
export class GoogleMeetModule {}
