import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const logger = new Logger('MikroORM');
const configService = new ConfigService();

const config: Options = {
  entities: [ './dist/source/*/*.entity.js' ],
  entitiesTs: [ './source/*/*.entity.ts' ],
  type: 'postgresql',
  dbName: configService.get<string>('POSTGRES_DB'),
  port: configService.get<number>('POSTGRES_PORT'),
  host: configService.get<string>('POSTGRES_HOST'),
  user: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
};

export default config;
