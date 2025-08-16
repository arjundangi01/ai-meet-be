import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingResolver } from './meeting.resolver';
import { DockerodeModule } from 'src/dockerode/dockerode.module';
import { PrismaModule } from 'src/db/db.module';

@Module({
  providers: [MeetingResolver, MeetingService],
  imports: [DockerodeModule, PrismaModule],
})
export class MeetingModule {}
