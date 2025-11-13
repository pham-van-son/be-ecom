import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from  '@nestjs/typeorm';

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    url: configService.get('DATABASE_URI'),
    entities: [__dirname + '/../**/*.schema{.ts,.js}', __dirname + '/../common/schema/*.schema{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    migrationsRun: process.env.NODE_ENV === 'production' ? true : false,
    synchronize: false,
    logging: true,
    ssl: { rejectUnauthorized: false },
    extra: { channel_binding: 'require' },
    ...(process.versions.pnp ? { entityPrefix: '' } : {}),
})