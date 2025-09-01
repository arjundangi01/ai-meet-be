import { Args, Query, Resolver } from '@nestjs/graphql';
import { GeminiService } from './gemini.service';

@Resolver()
export class GeminiResolver {
  constructor(private readonly geminiService: GeminiService) {}
}
