import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {createDatabase} from "typeorm-extension";
import { AppModule } from './app.module';

(async () => {
  await createDatabase({ifNotExist: true, charset: "utf8mb4_general_ci", characterSet: "utf8mb4"});
  process.exit(0);
})();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  await app.listen(3000);
}
bootstrap();
