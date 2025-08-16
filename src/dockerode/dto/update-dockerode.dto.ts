import { PartialType } from '@nestjs/swagger';
import { CreateDockerodeDto } from './create-dockerode.dto';

export class UpdateDockerodeDto extends PartialType(CreateDockerodeDto) {}
