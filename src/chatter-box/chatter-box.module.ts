import { Module } from '@nestjs/common';
import { ChatterBoxService } from './chatter-box.service';
import { ChatterBoxController } from './chatter-box.controller';

@Module({
  controllers: [ChatterBoxController],
  providers: [ChatterBoxService],
})
export class ChatterBoxModule {}
