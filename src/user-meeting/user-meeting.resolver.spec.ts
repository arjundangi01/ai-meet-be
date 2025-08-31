import { Test, TestingModule } from '@nestjs/testing';
import { UserMeetingResolver } from './user-meeting.resolver';
import { UserMeetingService } from './user-meeting.service';

describe('UserMeetingResolver', () => {
  let resolver: UserMeetingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMeetingResolver, UserMeetingService],
    }).compile();

    resolver = module.get<UserMeetingResolver>(UserMeetingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
