import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleCalendarModule } from './google-calendar/google-calendar.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { RecordingModule } from './recording/recording.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ConfigModule,
    GoogleCalendarModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      debug: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      // typePaths: ['./**/*.graphql'],
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      context: ({ req }) => ({ req }),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    RecordingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
