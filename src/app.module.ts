import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleCalendarModule } from './google-calendar/google-calendar.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { RecordingModule } from './recording/recording.module';
import { MeetingModule } from './meeting/meeting.module';
import { WebhookModule } from './webhook/webhook.module';
import { DockerodeModule } from './dockerode/dockerode.module';
import { UsersModule } from './users/users.module';
import { UserMeetingModule } from './user-meeting/user-meeting.module';
import { GeminiModule } from './gemini/gemini.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { GqlThrottlerGuard } from './lib/common/guard/throttler-guard';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),

    AuthModule,
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    GoogleCalendarModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      debug: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      // typePaths: ['./**/*.graphql'],
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      context: (req, res) => ({ req, res }),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    RecordingModule,
    MeetingModule,
    WebhookModule,
    DockerodeModule,
    UserMeetingModule,
    GeminiModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    CronModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule {}
