import { Injectable } from '@nestjs/common';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';
import { JoinMeetingInput } from './dto/join-meeting.input';
import { PrismaService } from 'src/db/db.service';
import { DockerodeService } from 'src/dockerode/dockerode.service';

@Injectable()
export class MeetingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dockerodeService: DockerodeService,
  ) {}
  create(createMeetingInput: CreateMeetingInput) {
    return 'This action adds a new meeting';
  }

  findAll() {
    return `This action returns all meeting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meeting`;
  }

  update(id: number, updateMeetingInput: UpdateMeetingInput) {
    return `This action updates a #${id} meeting`;
  }

  remove(id: number) {
    return `This action removes a #${id} meeting`;
  }

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
    console.log('userMeeting -->', userMeeting, meeting);
    //  create container
    const container = await this.dockerodeService.createContainer({
      userMeeting,
      userId,
      googleId: meeting.googleId,
    });

    console.log('container -->', container);

    return userMeeting;
  }
}
