import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDatabase } from "typeorm-extension";
import * as cookieParser from 'cookie-parser';
import { connectionOptions } from './database/database.config';

async function bootstrap() {
  await createDatabase({ifNotExist: true},connectionOptions);
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();