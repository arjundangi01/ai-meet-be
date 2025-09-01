import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiResolver } from './gemini.resolver';
import { GeminiController } from './gemini.controller';

@Module({
  controllers: [GeminiController],
  providers: [GeminiResolver, GeminiService],
  exports: [GeminiService],
})
export class GeminiModule {}
