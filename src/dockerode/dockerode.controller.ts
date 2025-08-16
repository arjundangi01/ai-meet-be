import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DockerodeService } from './dockerode.service';
import { CreateDockerodeDto } from './dto/create-dockerode.dto';
import { UpdateDockerodeDto } from './dto/update-dockerode.dto';

@Controller('dockerode')
export class DockerodeController {
  constructor(private readonly dockerodeService: DockerodeService) {}

  @Post()
  create(@Body() createDockerodeDto: CreateDockerodeDto) {
    return this.dockerodeService.create(createDockerodeDto);
  }

  @Get()
  findAll() {
    return this.dockerodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dockerodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDockerodeDto: UpdateDockerodeDto) {
    return this.dockerodeService.update(+id, updateDockerodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dockerodeService.remove(+id);
  }
}
