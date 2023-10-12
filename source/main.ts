import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

/**
 *
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 8080);

  await app.listen(port);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises, unicorn/prefer-top-level-await
bootstrap();
