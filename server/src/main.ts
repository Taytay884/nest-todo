import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
import { getDbConnectionOptions, runDbMigrations } from '@shared/utils';
dotenv.config();

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.forRoot(await getDbConnectionOptions(process.env.NODE_ENV)),
  );
  await runDbMigrations();
  await app.listen(port);
}
bootstrap();
