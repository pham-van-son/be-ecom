import * as dotenv from 'dotenv';

dotenv.config();

import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const typeOrmCliConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  url: configService.get('DATABASE_URI'),
  entities: ['src/common/schema/**/*.schema{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  logging: true,
  ssl: { rejectUnauthorized: false },
  extra: { channel_binding: 'require' },
});

// DataSource for TypeORM CLI migrations
export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URI,
  entities: ['src/common/schema/**/*.schema{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  logging: true,
  ssl: { rejectUnauthorized: false },
  extra: { channel_binding: 'require' },
});
