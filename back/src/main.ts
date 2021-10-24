import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDatabase } from "typeorm-extension";
import { connectionOptions } from './config/database.config';

async function bootstrap() {
  await createDatabase({ifNotExist: true},connectionOptions);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();