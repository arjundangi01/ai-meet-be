import { Module } from '@nestjs/common';
import { DockerodeService } from './dockerode.service';
import { DockerodeController } from './dockerode.controller';

@Module({
  controllers: [DockerodeController],
  providers: [DockerodeService],
  exports: [DockerodeService],
})
export class DockerodeModule {}
