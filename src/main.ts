import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(helmet());
  app.use(cookieParser());
  app.use(csurf(
    {
      cookie: true,
      ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
    },
  ));
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
