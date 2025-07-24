import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatterBoxService } from './chatter-box.service';
import { UpdateChatterBoxDto } from './dto/update-chatter-box.dto';

@Controller('chatter-box')
export class ChatterBoxController {
  constructor(private readonly chatterBoxService: ChatterBoxService) {}

  @Post()
  create() {
    return this.chatterBoxService.create();
  }

  @Get()
  findAll() {
    return this.chatterBoxService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatterBoxService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChatterBoxDto: UpdateChatterBoxDto,
  ) {
    return this.chatterBoxService.update(+id, updateChatterBoxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatterBoxService.remove(+id);
  }
}
