import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeetingService } from './meeting.service';
import { Meeting } from './entities/meeting.entity';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';
import { JoinMeetingInput } from './dto/join-meeting.input';

@Resolver(() => Meeting)
export class MeetingResolver {
  constructor(private readonly meetingService: MeetingService) {}

  @Mutation(() => Meeting)
  createMeeting(
    @Args('createMeetingInput') createMeetingInput: CreateMeetingInput,
  ) {
    return this.meetingService.create(createMeetingInput);
  }

  @Query(() => [Meeting], { name: 'meeting' })
  findAll() {
    return this.meetingService.findAll();
  }

  @Query(() => Meeting, { name: 'meeting' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.meetingService.findOne(id);
  }

  @Mutation(() => Meeting)
  updateMeeting(
    @Args('updateMeetingInput') updateMeetingInput: UpdateMeetingInput,
  ) {
    return this.meetingService.update(
      updateMeetingInput.id,
      updateMeetingInput,
    );
  }

  @Mutation(() => Meeting)
  removeMeeting(@Args('id', { type: () => Int }) id: number) {
    return this.meetingService.remove(id);
  }
  @Mutation(() => Meeting, { name: 'joinMeeting' })
  joinMeeting(@Args('joinMeetingInput') joinMeetingInput: JoinMeetingInput) {
    return this.meetingService.joinMeeting(joinMeetingInput, '');
  }
}
