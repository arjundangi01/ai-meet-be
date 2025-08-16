import { Injectable } from '@nestjs/common';
import { CreateDockerodeDto } from './dto/create-dockerode.dto';
import { UpdateDockerodeDto } from './dto/update-dockerode.dto';
import { UserMeeting } from '@prisma/client';
import config from 'src/lib/config/env-config';
const Docker = require('dockerode');

@Injectable()
export class DockerodeService {
  create(createDockerodeDto: CreateDockerodeDto) {
    return 'This action adds a new dockerode';
  }

  findAll() {
    return `This action returns all dockerode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dockerode`;
  }

  update(id: number, updateDockerodeDto: UpdateDockerodeDto) {
    return `This action updates a #${id} dockerode`;
  }

  remove(id: number) {
    return `This action removes a #${id} dockerode`;
  }

  createContainer(input: {
    userMeeting: Pick<UserMeeting, 'id' | 'meetingId'>;
    googleId: string;
    userId: string;
  }) {
    // pull image and run container
    // docker pull arjundangi01/bot-warn:latest
    //  where docker is running on my local system, using dockerode

    const docker = new Docker({ host: 'localhost' });
    //  pull image and run that image in a new container
    const newContainer = docker.createContainer({
      Image: 'arjundangi01/bot-warn:latest',
      name: input.googleId,
      Env: [
        'GOOGLE_MEETING_ID=' + input.googleId,
        'USER_ID=' + input.userId,
        'USER_MEETING_ID=' + input.userMeeting.id,
        'GCP_BUCKET_NAME=' + config.GCP_BUCKET_NAME,
        'GCP_PROJECT_ID=' + config.GCP_PROJECT_ID,
      ],
      HostConfig: {
        PortBindings: {
          '8080/tcp': [{ HostPort: '8080' }],
        },
      },
    });
    newContainer.start();
    return newContainer;
  }
}
