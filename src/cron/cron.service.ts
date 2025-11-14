import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { USER_MEETING_STATUS } from '@prisma/client';
import { PrismaService } from 'src/db/db.service';
import { GeminiService } from 'src/gemini/gemini.service';

@Injectable()
export class CronService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly geminiService: GeminiService,
  ) {}
  @Cron(CronExpression.EVERY_2_HOURS)
  async handleCron() {
    console.log('Called every 30 seconds');
    try {
      const meetingsWithoutSummary = await this.prisma.userMeeting.findMany({
        where: {
          summary: '',
          status: USER_MEETING_STATUS.ENDED,
          transcript: {
            not: null,
          },
        },
        take: 1,
      });
      console.log('Meetings without summary', meetingsWithoutSummary.length);
      for (const meeting of meetingsWithoutSummary) {
        console.log('Generating summary for meeting', meeting.id);
        const summary = await this.geminiService.generateSummary(
          JSON.stringify(meeting.transcript),
        );
        console.log('Summary generated', summary?.length);
        await this.prisma.userMeeting.update({
          where: { id: meeting.id },
          data: { summary },
        });
        console.log('Meeting updated', meeting.id);
      }
    } catch (error) {
      console.log('Error generating summary', error);
    }
  }
}
