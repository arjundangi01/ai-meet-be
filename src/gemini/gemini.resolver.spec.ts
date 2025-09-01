import { Test, TestingModule } from '@nestjs/testing';
import { GeminiResolver } from './gemini.resolver';
import { GeminiService } from './gemini.service';

describe('GeminiResolver', () => {
  let resolver: GeminiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeminiResolver, GeminiService],
    }).compile();

    resolver = module.get<GeminiResolver>(GeminiResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
