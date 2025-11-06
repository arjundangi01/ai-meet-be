import { Injectable } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { MeetingEndedDto } from './dto/meeting-ent.dto';
import { PrismaService } from 'src/db/db.service';
import { USER_MEETING_STATUS } from '@prisma/client';
import { GeminiService } from 'src/gemini/gemini.service';
const Docker = require('dockerode');
@Injectable()
export class WebhookService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly geminiService: GeminiService,
  ) {}
  create(createWebhookDto: CreateWebhookDto) {
    return 'This action adds a new webhook';
  }

  findAll() {
    return `This action returns all webhook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} webhook`;
  }

  update(id: number, updateWebhookDto: UpdateWebhookDto) {
    return `This action updates a #${id} webhook`;
  }

  remove(id: number) {
    return `This action removes a #${id} webhook`;
  }

  async handleMeetingEnded(body: MeetingEndedDto) {
    const summary = (await this.geminiService.generateSummary(
      JSON.stringify(body.transcript),
    )) as string;

    console.log('Summary generated', summary?.length);

    const userMeeting = await this.prisma.userMeeting.findUnique({
      where: { id: body.userMeetingId },
    });

    if (!userMeeting) {
      console.log('User meeting not found');
      return;
    }
    const docker = new Docker();

    const container = docker.getContainer(userMeeting.containerId);

    // Stop the container (ignore error if already stopped)
    await container.stop().catch((err) => {
      if (err.statusCode === 304) {
        console.log(`Container  already stopped.`);
      } else {
        console.log('Error stopping container', err);
      }
    });

    // Remove the container
    await container.remove({ force: true });
    console.log(`Container  stopped and removed.`);

    const containerPort = await this.prisma.containerPort.findFirst({
      where: { userMeetingId: userMeeting.id },
    });

    if (containerPort) {
      await this.prisma.containerPort.update({
        where: { id: containerPort.id },
        data: { userMeetingId: null },
      });
    }

    //  update user meeting
    await this.prisma.userMeeting.update({
      where: { id: body.userMeetingId },
      data: {
        transcript: body.transcript ? JSON.stringify(body.transcript) : null,
        fileUrl: body.fileUrl ? body.fileUrl : null,
        status: USER_MEETING_STATUS.ENDED,
        summary: summary ?? '',
        participants: JSON.stringify(body.participantNames),
        meeting: {
          update: {
            name: body.meetingName,
          },
        },
      },
    });

    console.log('User meeting updated');
  }
}
