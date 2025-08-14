import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RecordingService } from './recording.service';
import { Recording } from './entities/recording.entity';
import { CreateRecordingInput } from './dto/create-recording.input';
import { UpdateRecordingInput } from './dto/update-recording.input';
import {
  GetRecordingsInput,
  PaginatedRecordingResponse,
} from './dto/get-recording.input';
import {
  constructPaginatedResponse,
  handlePaginationParams,
} from 'src/lib/utils/serviceUtils/paginatedRequest';

@Resolver(() => Recording)
export class RecordingResolver {
  constructor(private readonly recordingService: RecordingService) {}

  @Mutation(() => Recording)
  createRecording(
    @Args('createRecordingInput') createRecordingInput: CreateRecordingInput,
  ) {
    return this.recordingService.create(createRecordingInput);
  }

  @Query(() => PaginatedRecordingResponse, { name: 'recordings' })
  async findAll(
    @Args('input', { type: () => GetRecordingsInput })
    input: GetRecordingsInput,
  ) {
    const { after, before, limit } = handlePaginationParams({
      after: input.after,
      before: input.before,
      first: input.first,
      last: input.last,
    });
    const { recordings, total } = await this.recordingService.findAll({
      ...input,
      after,
      before,
      first: limit,
      last: limit,
    });

    return constructPaginatedResponse({
      after,
      before,
      limit,
      result: { data: recordings, total: total },
    });
  }

  @Query(() => Recording, { name: 'recording' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.recordingService.findOne(id);
  }

  @Mutation(() => Recording)
  updateRecording(
    @Args('updateRecordingInput') updateRecordingInput: UpdateRecordingInput,
  ) {
    return this.recordingService.update(
      updateRecordingInput.id,
      updateRecordingInput,
    );
  }

  @Mutation(() => Recording)
  removeRecording(@Args('id', { type: () => Int }) id: number) {
    return this.recordingService.remove(id);
  }
}
