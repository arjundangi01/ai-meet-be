import { Module } from '@nestjs/common';
import { UserMeetingService } from './user-meeting.service';
import { UserMeetingResolver } from './user-meeting.resolver';

@Module({
  providers: [UserMeetingResolver, UserMeetingService],
})
export class UserMeetingModule {}
