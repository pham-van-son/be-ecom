import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadImagesService } from './upload-images.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('upload-images')
export class UploadImagesController {
  constructor(private readonly uploadImagesService: UploadImagesService) {}

  // Upload 1 ảnh
  @Post('single')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: join(process.cwd(), 'public', 'uploads', 'images'),
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + '-' + file.originalname);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Chỉ chấp nhận file ảnh!'), false);
        }
        callback(null, true);
      },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return {
        message: 'Không tìm thấy file',
        status: 400,
      };
    }
    return {
      message: 'Upload ảnh thành công',
      path: `/uploads/images/${file.filename}`,
    };
  }

  // Upload nhiều ảnh
  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: join(process.cwd(), 'public', 'uploads', 'images'),
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + '-' + file.originalname);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Chỉ chấp nhận file ảnh!'), false);
        }
        callback(null, true);
      },
    }),
  )
  uploadMultipleImages(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      return {
        message: 'Không tìm thấy file',
        status: 400,
      };
    }
    return {
      message: 'Upload nhiều ảnh thành công',
      paths: files.map((file) => `/uploads/images/${file.filename}`),
    };
  }

  // Xóa ảnh
  @Delete(':path')
  async deleteImage(@Param('path') path: string) {
    await this.uploadImagesService.deleteImage(path);
    return {
      message: 'Xóa ảnh thành công',
    };
  }

  // Lấy danh sách ảnh
  @Get()
  async getImages() {
    const images = await this.uploadImagesService.getImages();
    return {
      message: 'Lấy danh sách ảnh thành công',
      images,
    };
  }
}
