import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatterBoxModule } from './chatter-box/chatter-box.module';

@Module({
  imports: [ChatterBoxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
