import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserMeetingService } from './user-meeting.service';
import { UserMeeting } from './entities/user-meeting.entity';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import {
  GetUserMeetingsInput,
  PaginatedUserMeetingResponse,
} from './dto/get-user-meeting.input';
import {
  constructPaginatedResponse,
  handlePaginationParams,
} from 'src/lib/utils/serviceUtils/paginatedRequest';
import { CurrentUser } from 'src/auth/dto/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { MeetingService } from 'src/meeting/meeting.service';

@Resolver(() => UserMeeting)
export class UserMeetingResolver {
  constructor(
    private readonly userMeetingService: UserMeetingService,
    private readonly meetingService: MeetingService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Query(() => PaginatedUserMeetingResponse, { name: 'userMeetings' })
  async findAll(
    @Args('input', { type: () => GetUserMeetingsInput })
    input: GetUserMeetingsInput,
    @CurrentUser() user: User,
  ) {
    try {
      const userId = user.id;

      const { after, before, limit } = handlePaginationParams({
        after: input.after,
        before: input.before,
        first: input.first,
        last: input.last,
      });

      const { userMeetings, total } = await this.userMeetingService.findAll(
        {
          ...input,
          after,
          before,
          first: limit,
          last: limit,
        },
        userId,
      );

      return constructPaginatedResponse({
        after,
        before,
        limit,
        result: { data: userMeetings, total: total },
      });
    } catch (error) {
      console.log('error -->', error);
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @Query(() => UserMeeting, { name: 'userMeeting' })
  async findOne(
    @Args('id', { type: () => String }) id: string,
    // @CurrentUser() user: User,
  ) {
    try {
      // const userId = user.id;
      return this.userMeetingService.findOne(id);
    } catch (error) {
      console.log('error -->', error);
    }
  }

  @ResolveField(() => Meeting)
  async meeting(@Parent() userMeeting: UserMeeting) {
    return this.meetingService.findOne(userMeeting.meetingId);
  }
}
