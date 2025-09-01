import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { GeminiModule } from 'src/gemini/gemini.module';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService],
  imports: [GeminiModule],
})
export class WebhookModule {}
