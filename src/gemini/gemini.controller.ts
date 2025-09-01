import { Controller, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { Body } from '@nestjs/common';
import { GenerateSummaryDto } from './dto/generate-summary.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('generateSummary')
  generateSummary(@Body() body: GenerateSummaryDto) {
    return this.geminiService.generateSummary(JSON.stringify(body.transcript));
    // return {
    //   message: 'Summary generated',
    // };
  }
}
