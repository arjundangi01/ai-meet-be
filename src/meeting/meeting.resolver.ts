import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeetingService } from './meeting.service';
import { Meeting } from './entities/meeting.entity';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';
import { JoinMeetingInput } from './dto/join-meeting.input';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/auth/dto/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Meeting)
export class MeetingResolver {
  constructor(private readonly meetingService: MeetingService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Mutation(() => Meeting, { name: 'joinMeeting' })
  async joinMeeting(
    @Args('input') input: JoinMeetingInput,
    @CurrentUser() user: User,
  ): Promise<Meeting> {
    try {
      console.log('input -->', input);
      await this.meetingService.joinMeeting(input, user.id);
      return {
        id: '1',
      };
    } catch (error) {
      console.log('error -->', error);
    }
  }
}
