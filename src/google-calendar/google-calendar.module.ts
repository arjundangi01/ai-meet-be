import { Module } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';
import { GoogleCalendarController } from './google-calendar.controller';
import { PrismaModule } from 'src/db/db.module';

@Module({
  controllers: [GoogleCalendarController],
  providers: [GoogleCalendarService],
  imports: [PrismaModule],
  exports: [GoogleCalendarService],
})
export class GoogleCalendarModule {}
