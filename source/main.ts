import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { EntityConflictExceptionFilter } from './filter/entity-conflict.exception.filter';
import { EntityNotFoundExceptionFilter } from './filter/entity-not-found.exception.filter';
import { UnprocessableEntityExceptionFilter } from './filter/unprocessable-entity.exception.filter';

/**
 * Entry point of the application.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 8080);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  app.useGlobalFilters(new EntityConflictExceptionFilter());
  app.useGlobalFilters(new UnprocessableEntityExceptionFilter());

  await app.listen(port);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises, unicorn/prefer-top-level-await
bootstrap();
