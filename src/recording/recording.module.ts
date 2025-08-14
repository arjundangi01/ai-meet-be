import { Module } from '@nestjs/common';
import { RecordingService } from './recording.service';
import { RecordingResolver } from './recording.resolver';

@Module({
  providers: [RecordingResolver, RecordingService],
})
export class RecordingModule {}
