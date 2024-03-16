import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


/* Primeira função a ser executada */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); /* Configura o pipe de forma global */
  await app.listen(3000);
}
bootstrap();
