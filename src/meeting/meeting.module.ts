import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingResolver } from './meeting.resolver';
import { DockerodeModule } from 'src/dockerode/dockerode.module';
import { PrismaModule } from 'src/db/db.module';
import { GoogleCalendarModule } from 'src/google-calendar/google-calendar.module';

@Module({
  providers: [MeetingResolver, MeetingService],
  imports: [DockerodeModule, PrismaModule, GoogleCalendarModule],
  exports: [MeetingService],
})
export class MeetingModule {}
