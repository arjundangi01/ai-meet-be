import { Injectable } from '@nestjs/common';
import { CreateDockerodeDto } from './dto/create-dockerode.dto';
import { UpdateDockerodeDto } from './dto/update-dockerode.dto';
import { Prisma, UserMeeting } from '@prisma/client';
import config from 'src/lib/config/env-config';
import { PrismaService } from 'src/db/db.service';
import { ENV } from 'src/lib/enums/common';
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

  async createContainer(input: {
    userMeeting: Prisma.UserMeetingGetPayload<{
      include: {
        user: true;
      };
    }>;
    googleId: string;
    userId: string;
    port: number;
  }) {
    try {
      const b64 = Buffer.from(JSON.stringify(config.GCP_KEY_JSON)).toString(
        'base64',
      );

      const docker = new Docker();
      const imageName = config.DOCKER_IMAGE_NAME;
      const authConfig = {
        username: config.DOCKER_USERNAME,
        password: config.DOCKER_PASSWORD,
      };

      let imageExists = true;
      try {
        await docker.getImage(imageName).inspect();
      } catch (err) {
        imageExists = false;
      }
      console.log('imageExists -->', imageExists);

      if (!imageExists) {
        await new Promise((resolve, reject) => {
          docker.pull(imageName, { authconfig: authConfig }, (err, stream) => {
            if (err) return reject(err);

            docker.modem.followProgress(stream, onFinished, onProgress);

            function onFinished(err, output) {
              if (err) return reject(err);
              resolve(output);
            }

            function onProgress(event) {
              if (event.status) {
                console.log(event.status, event.progress || '');
              }
            }
          });
        });
      }

      const newContainer = await docker.createContainer({
        Image: imageName,
        name: `${input.googleId}-${input.userMeeting.id}-${new Date().getTime()}`,
        Env: [
          'GOOGLE_MEETING_ID=' + input.googleId,
          'USER_ID=' + input.userId,
          'USER_MEETING_ID=' + input.userMeeting.id,
          'GCP_BUCKET_NAME=' + config.GCP_BUCKET_NAME,
          'GCP_PROJECT_ID=' + config.GCP_PROJECT_ID,
          'GCP_KEY_B64=' + b64,
          'USER_NAME=' + input.userMeeting.user.name,
          'PORT=' + input.port,
          'SERVER_URL=' + config.SERVER_URL,
          'NODE_ENV=' + ENV.PRODUCTION,
        ],
        AttachStdout: true,
        HostConfig: {
          PortBindings: {
            '8080/tcp': [{ HostPort: '8080' }],
          },
        },
      });
      await newContainer.start();
      return newContainer;
    } catch (error) {
      console.log('error in createContainer -->', error);
      throw error;
    }
  }
}
