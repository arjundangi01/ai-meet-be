export class MeetingEndedDto {
  userMeetingId: string;
  transcript?: string;
  fileUrl?: string;
  participantNames: string[];
  meetingName: string;
}
