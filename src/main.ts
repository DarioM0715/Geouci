import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //ACTIVAR VALIDACION DE MANERA GLOBAL (Req DTO)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true
  }))

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
