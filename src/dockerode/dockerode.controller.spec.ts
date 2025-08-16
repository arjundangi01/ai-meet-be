import { Test, TestingModule } from '@nestjs/testing';
import { DockerodeController } from './dockerode.controller';
import { DockerodeService } from './dockerode.service';

describe('DockerodeController', () => {
  let controller: DockerodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DockerodeController],
      providers: [DockerodeService],
    }).compile();

    controller = module.get<DockerodeController>(DockerodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
