import { Module } from '@nestjs/common';
import { UserMeetingService } from './user-meeting.service';
import { UserMeetingResolver } from './user-meeting.resolver';
import { MeetingModule } from 'src/meeting/meeting.module';

@Module({
  providers: [UserMeetingResolver, UserMeetingService],
  imports: [MeetingModule],
})
export class UserMeetingModule {}
