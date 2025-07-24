import { Test, TestingModule } from '@nestjs/testing';
import { ChatterBoxService } from './chatter-box.service';

describe('ChatterBoxService', () => {
  let service: ChatterBoxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatterBoxService],
    }).compile();

    service = module.get<ChatterBoxService>(ChatterBoxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
