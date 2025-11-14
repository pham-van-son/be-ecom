import { Module } from '@nestjs/common';
import { UploadVideosService } from './upload-videos.service';
import { UploadVideosController } from './upload-videos.controller';

@Module({
  controllers: [UploadVideosController],
  providers: [UploadVideosService],
})
export class UploadVideosModule {}
