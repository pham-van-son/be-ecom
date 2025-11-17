import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'ecom_postgres',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'ecom_user_hongson',
  password: process.env.POSTGRES_PASSWORD || 'ecom_password_hongson',
  database: process.env.POSTGRES_DB || 'ecom_db',

  entities: [join(__dirname, '../schema/*.entity.{ts,js}')],
  autoLoadEntities: true,

  synchronize: false,
  migrationsRun: false,
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],

  logging: true,
};

export default ormConfig;
