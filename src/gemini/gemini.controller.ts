import { Controller, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { Body } from '@nestjs/common';
import { GenerateSummaryDto } from './dto/generate-summary.dto';
import { PrismaService } from 'src/db/db.service';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('generateSummary')
  async generateSummary(@Body() body: GenerateSummaryDto) {
    const summary = await this.geminiService.generateSummary(
      JSON.stringify(body.transcript),
    );

    return {
      summary: summary,
    };
  }
}
