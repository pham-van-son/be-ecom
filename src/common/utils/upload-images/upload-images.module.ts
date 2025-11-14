import { Module } from '@nestjs/common';
import { UploadImagesService } from './upload-images.service';
import { UploadImagesController } from './upload-images.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './public/uploads',
      storage: undefined,
    }),
  ],
  controllers: [UploadImagesController],
  providers: [UploadImagesService],
  exports: [UploadImagesService],
})
export class UploadImagesModule {}
