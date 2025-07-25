import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatterBoxModule } from './chatter-box/chatter-box.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ChatterBoxModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
