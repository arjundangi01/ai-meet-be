import { Injectable } from '@nestjs/common';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';
import { JoinMeetingInput } from './dto/join-meeting.input';
import { PrismaService } from 'src/db/db.service';
import { DockerodeService } from 'src/dockerode/dockerode.service';
import { USER_MEETING_STATUS } from '@prisma/client';
import { GoogleCalendarService } from 'src/google-calendar/google-calendar.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MeetingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dockerodeService: DockerodeService,
    private readonly googleCalendarService: GoogleCalendarService,
  ) {}

  async joinMeeting(joinMeetingInput: JoinMeetingInput, user: User) {
    const dbContainer = await this.prisma.containerPort.findFirst({
      where: {
        userMeetingId: null,
      },
      orderBy: {
        port: 'asc',
      },
    });
    if (!dbContainer) {
      throw new Error('No available slot');
    }

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
            userId: user.id,
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
      userId: user.id,
      googleId: meeting.googleId,
      port: dbContainer.port,
    });

    await Promise.all([
      this.prisma.userMeeting.update({
        where: { id: userMeeting.id },
        data: { containerId: container.id, status: USER_MEETING_STATUS.JOINED },
      }),
      this.prisma.containerPort.update({
        where: { id: dbContainer.id },
        data: { userMeetingId: userMeeting.id },
      }),
    ]);

    return userMeeting;
  }
}
