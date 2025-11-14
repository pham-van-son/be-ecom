import * as dotenv from 'dotenv';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './common/utils/location/location.module';
import { UploadImagesModule } from './common/utils/upload-images/upload-images.module';
import { UploadVideosModule } from './common/utils/upload-videos/upload-videos.module';

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
    LocationModule,
    UploadImagesModule,
    UploadVideosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
