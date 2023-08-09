import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppDataSource } from "./data-source";

const port = process.env.PORT;

async function bootstrap() {
  await AppDataSource.initialize();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  
  console.log(`server uses port ${port}`);
}
bootstrap();
