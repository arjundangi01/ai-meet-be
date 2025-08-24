import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import multiPart from '@fastify/multipart';
import envConfig from './lib/config/env-config';
import { ENV } from './lib/enums/common';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      rawBody: true,
      bodyParser: true,
    },
  );
  app.enableCors({
    origin: ['http://localhost:3000', 'https://replay-ai-gray.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  await app.register(multiPart as any);

  if (envConfig.NODE_ENV === ENV.DEVELOPMENT) {
    const config = new DocumentBuilder()
      .setTitle('replay ai')
      .setDescription('The replay ai API description')
      .setVersion('0.1')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  // app.useBodyParser('application/json', { bodyLimit: 10 * 1000 * 1024 });
  const port = process.env.PORT ? Number(process.env.PORT) : 8080;
  await app.listen({ port, host: '0.0.0.0' });

  console.log(`Server running on port ${port}`);
  console.log(`Swagger http://localhost:${port}/docs`);
  console.log(`GraphQL http://localhost:${port}/graphql`);
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(8989);
//   app.useGlobalPipes(
//     new ValidationPipe({
//       transform: true,
//       whitelist: true,
//     }),
//   );
// }
// bootstrap();
