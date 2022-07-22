import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { MongoExceptionFilter } from './filters/mongo-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new MongoExceptionFilter);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'static/resetPass'));
  await app.listen(3000);
}
bootstrap();