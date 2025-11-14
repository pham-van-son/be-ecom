import { Controller } from '@nestjs/common';
import { UploadVideosService } from './upload-videos.service';

@Controller('upload-videos')
export class UploadVideosController {
  constructor(private readonly uploadVideosService: UploadVideosService) {}
}
