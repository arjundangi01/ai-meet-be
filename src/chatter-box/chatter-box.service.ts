import { Injectable } from '@nestjs/common';
import { UpdateChatterBoxDto } from './dto/update-chatter-box.dto';
import axios from 'axios';
const CHATTER_BOX_API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODgxMTgyMjYwZDJmN2I2MWJjNGMwNTIiLCJlbWFpbCI6ImFyanVuZGFuZ2k5MDc0NzNAZ21haWwuY29tIiwiaWF0IjoxNzUzMjkwNzg2LCJleHAiOjE3NjEwNjY3ODZ9.OpGyLZHG_0bHXwLsr7PuOhlfIYYopiSDw9S8d4oZTr8';
import { ChatterBox } from '@chatterboxio/bot';

@Injectable()
export class ChatterBoxService {
  private readonly chatterBox = ChatterBox({
    authorizationToken: CHATTER_BOX_API_KEY,
  });

  async create() {
    try {
      // const response = await axios.post(
      //   'https://bot.chatter-box.io/join',
      //   {
      //     platform: 'googlemeet',
      //     botName: 'My Bot',
      //     meetingId: 'vtd-nabf-eqa',
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${CHATTER_BOX_API_KEY}`,
      //       'Content-Type': 'application/json',
      //     },
      //   },
      // );
      const { id: sessionId } = await this.chatterBox.sendBot({
        platform: 'googlemeet',
        meeting_id: 'vtd-nabf-eqa',
        bot_name: 'My Bot',
      });
      console.log('Bot started successfully! Session ID:', sessionId);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const socket = this.chatterBox.connectSocket(sessionId, {
        onMeetingStarted: (data) => console.log('Meeting started:', data),
        onMeetingFinished: (data) => console.log('Meeting finished:', data),
        onTranscriptReceived: (data) => console.log('Transcript:', data),
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      process.on('exit', () => socket.close());
      console.log(sessionId);
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all chatterBox`;
  }

  async findOne(sessionId: string) {
    try {
      // await axios.post(
      //   `https://api.chatter-box.io/session/${sessionId}/leave`,
      //   {},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${CHATTER_BOX_API_KEY}`,
      //     },
      //   },
      // );

      const meetingData = await axios.get(
        `https://bot.chatter-box.io/session/${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${CHATTER_BOX_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(meetingData.data);
    } catch (error) {
      console.log(error);
    }
    // return `This action returns a #${id} chatterBox`;
  }

  update(id: number, updateChatterBoxDto: UpdateChatterBoxDto) {
    console.log(updateChatterBoxDto);
    return `This action updates a #${id} chatterBox`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatterBox`;
  }
}
