import * as dotenv from 'dotenv';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './public/uploads',
    }),
    TypeOrmModule.forRootAsync({}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
