import { Injectable } from '@nestjs/common';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';
import { JoinMeetingInput } from './dto/join-meeting.input';

@Injectable()
export class MeetingService {
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

  joinMeeting(joinMeetingInput: JoinMeetingInput) {
    return `This action joins a #${joinMeetingInput.meetingId} meeting`;
  }
}
