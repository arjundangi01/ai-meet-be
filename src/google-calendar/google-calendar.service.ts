import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateGoogleCalendarDto } from './dto/create-google-calendar.dto';
import { UpdateGoogleCalendarDto } from './dto/update-google-calendar.dto';
import { PrismaService } from 'src/db/db.service';
import { google } from 'googleapis';
@Injectable()
export class GoogleCalendarService {
  constructor(private prisma: PrismaService) {}

  create(createGoogleCalendarDto: CreateGoogleCalendarDto) {
    return 'This action adds a new googleCalendar';
  }

  async findAll() {
    const user = await this.prisma.user.findFirst({});
    if (!user || !user.accessToken) {
      throw new UnauthorizedException('User or token not found');
    }
    const auth = new google.auth.OAuth2();
    auth.setCredentials({
      access_token: user.accessToken,
    });

    const calendar = google.calendar({ version: 'v3', auth });
    const res = await calendar.events.list({
      calendarId: 'primary',
      maxResults: 10,
    });
    return res.data.items;
  }

  findOne(id: number) {
    return `This action returns a #${id} googleCalendar`;
  }

  update(id: number, updateGoogleCalendarDto: UpdateGoogleCalendarDto) {
    return `This action updates a #${id} googleCalendar`;
  }

  remove(id: number) {
    return `This action removes a #${id} googleCalendar`;
  }
}
