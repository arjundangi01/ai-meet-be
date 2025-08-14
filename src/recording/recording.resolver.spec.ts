import { Test, TestingModule } from '@nestjs/testing';
import { RecordingResolver } from './recording.resolver';
import { RecordingService } from './recording.service';

describe('RecordingResolver', () => {
  let resolver: RecordingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordingResolver, RecordingService],
    }).compile();

    resolver = module.get<RecordingResolver>(RecordingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
