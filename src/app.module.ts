import * as dotenv from 'dotenv';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { LocationModule } from './common/utils/location/location.module';
import { UploadImagesModule } from './common/utils/upload-images/upload-images.module';
import { UploadVideosModule } from './common/utils/upload-videos/upload-videos.module';
import { UserModule } from './modules/user/user.module';
import { CustomerModule } from './modules/customer/customer.module';
import { RoleModule } from './modules/role/role.module';

dotenv.config();

const { DATABASE_URI } = process.env;

if (!DATABASE_URI) {
  throw new Error('DATABASE_URI is not defined');
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './public/uploads',
    }),
    MongooseModule.forRoot(DATABASE_URI),

    LocationModule,
    UploadImagesModule,
    UploadVideosModule,
    UserModule,
    CustomerModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
