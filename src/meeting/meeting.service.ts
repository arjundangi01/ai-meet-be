import { Injectable } from '@nestjs/common';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';
import { JoinMeetingInput } from './dto/join-meeting.input';
import { PrismaService } from 'src/db/db.service';
import { DockerodeService } from 'src/dockerode/dockerode.service';
import { USER_MEETING_STATUS } from '@prisma/client';

@Injectable()
export class MeetingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dockerodeService: DockerodeService,
  ) {}

  async joinMeeting(joinMeetingInput: JoinMeetingInput, userId: string) {
    const { userMeeting, meeting } = await this.prisma.$transaction(
      async (tx) => {
        let meeting = await tx.meeting.findUnique({
          where: {
            id: joinMeetingInput.meetingId,
          },
        });

        if (!meeting) {
          meeting = await tx.meeting.create({
            data: {
              googleId: joinMeetingInput.meetingId,
            },
          });
        }
        const userMeeting = await tx.userMeeting.create({
          data: {
            userId,
            meetingId: meeting.id,
          },
          include: {
            user: true,
          },
        });
        return {
          userMeeting,
          meeting,
        };
      },
    );
    //  create container
    const container = await this.dockerodeService.createContainer({
      userMeeting,
      userId,
      googleId: meeting.googleId,
    });

    await this.prisma.userMeeting.update({
      where: { id: userMeeting.id },
      data: { containerId: container.id, status: USER_MEETING_STATUS.JOINED },
    });

    return userMeeting;
  }
}
