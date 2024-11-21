import { NestFactory } from '@nestjs/core';
import { App1Module } from './app.module';
import { PrismaService } from './prisma.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(App1Module);
  const prismaService = app.get(PrismaService);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await prismaService.enableShutdownHooks(app);
  await app.listen(15001);
}
bootstrap();
