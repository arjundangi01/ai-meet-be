import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { PrismaModule } from 'src/db/db.module';
import { GeminiModule } from 'src/gemini/gemini.module';

@Module({
  controllers: [CronController],
  providers: [CronService],
  imports: [PrismaModule, GeminiModule],
})
export class CronModule {}
