import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import multiPart from '@fastify/multipart';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      rawBody: true,
      bodyParser: true,
    },
  );
  await app.enableCors();
  await app.register(multiPart as any);
  const config = new DocumentBuilder()
    .setTitle('Intellectica')
    .setDescription('The Intellectica API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  // app.useBodyParser('application/json', { bodyLimit: 10 * 1000 * 1024 });

  await app.listen(8989, '0.0.0.0');
  console.log(`Server http://localhost:8989/api`);
  console.log(`Server swagger http://localhost:8989/docs`);
  console.log(`Server graphql http://localhost:8989/graphql`);
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
