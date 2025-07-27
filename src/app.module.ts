import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatterBoxModule } from './chatter-box/chatter-box.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleCalendarModule } from './google-calendar/google-calendar.module';
import { GoogleMeetModule } from './google-meet/google-meet.module';

@Module({
  imports: [
    ChatterBoxModule,
    AuthModule,
    UsersModule,
    PrismaModule,
    ConfigModule,
    GoogleCalendarModule,
    GoogleMeetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
