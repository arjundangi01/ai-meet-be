import { Test, TestingModule } from '@nestjs/testing';
import { ChatterBoxController } from './chatter-box.controller';
import { ChatterBoxService } from './chatter-box.service';

describe('ChatterBoxController', () => {
  let controller: ChatterBoxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatterBoxController],
      providers: [ChatterBoxService],
    }).compile();

    controller = module.get<ChatterBoxController>(ChatterBoxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
