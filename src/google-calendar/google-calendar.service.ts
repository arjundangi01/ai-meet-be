import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateGoogleCalendarDto } from './dto/create-google-calendar.dto';
import { UpdateGoogleCalendarDto } from './dto/update-google-calendar.dto';
import { PrismaService } from 'src/db/db.service';
import { google } from 'googleapis';
import { User } from 'src/users/entities/user.entity';
import { SpacesServiceClient } from '@google-apps/meet';
import envConfig from 'src/lib/config/env-config';
import { JWT } from 'google-auth-library/build/src/auth/jwtclient';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleCalendarService {
  private oauth2Client: OAuth2Client;
  constructor(private prisma: PrismaService) {
    this.oauth2Client = new OAuth2Client(
      envConfig.GCP_KEY_JSON.client_id,
      envConfig.GCP_KEY_JSON.client_secret,
      envConfig.GCP_KEY_JSON.auth_uri,
    );
  }

  create(createGoogleCalendarDto: CreateGoogleCalendarDto) {
    return 'This action adds a new googleCalendar';
  }

  async findAll({ user }: { user: User }) {
    if (!user || !user.accessToken) {
      throw new UnauthorizedException('User or token not found');
    }
    this.oauth2Client.setCredentials({
      access_token: user.accessToken,
    });

    const calendar = google.calendar({
      version: 'v3',
      auth: this.oauth2Client,
    });
    const res = await calendar.events.list({
      calendarId: 'primary',
      maxResults: 10,
    });

    return res.data.items;
  }

  update(id: number, updateGoogleCalendarDto: UpdateGoogleCalendarDto) {
    return `This action updates a #${id} googleCalendar`;
  }

  remove(id: number) {
    return `This action removes a #${id} googleCalendar`;
  }

  async fetchMeetSpace({
    user,
    meetingCode,
  }: {
    user: User;
    meetingCode: string;
  }) {
    const SCOPES = [
      'https://www.googleapis.com/auth/meetings.space.readonly',
      'https://www.googleapis.com/auth/meetings.space.created',
    ];
    this.oauth2Client.setCredentials({
      access_token: user.accessToken,
      scope: SCOPES.join(' '),
    });

    const meet = google.meet({ version: 'v2', auth: this.oauth2Client });
    const res = await meet.spaces.get({
      name: `spaces/${meetingCode}`,
    });
    return res.data;
  }
}
