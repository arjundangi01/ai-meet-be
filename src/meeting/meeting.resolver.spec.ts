import { Test, TestingModule } from '@nestjs/testing';
import { MeetingResolver } from './meeting.resolver';
import { MeetingService } from './meeting.service';

describe('MeetingResolver', () => {
  let resolver: MeetingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeetingResolver, MeetingService],
    }).compile();

    resolver = module.get<MeetingResolver>(MeetingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
