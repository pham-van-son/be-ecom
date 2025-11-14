import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadImagesService {
  constructor(private readonly configService: ConfigService) {}

  private ensureDirectoryExists(directory: string) {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  }

  // Upload 1 ảnh
  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file || !file.buffer) {
      throw new Error('File không hợp lệ');
    }

    const fileName = `${uuid()}${path.extname(file.originalname)}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'images');
    this.ensureDirectoryExists(uploadDir);
    const filePath = path.join(uploadDir, fileName);

    try {
      await fs.promises.writeFile(filePath, file.buffer);
      return `/uploads/images/${fileName}`;
    } catch (error: any) {
      throw new Error(`Lỗi khi lưu file: ${error?.message || 'Unknown error'}`);
    }
  }

  // Upload nhiều ảnh
  async uploadMultipleImages(files: Express.Multer.File[]): Promise<string[]> {
    if (!files || files.length === 0) {
      throw new Error('Không có file nào được upload');
    }

    const uploadPromises = files.map((file) => this.uploadImage(file));
    return Promise.all(uploadPromises);
  }

  // Xóa ảnh
  async deleteImage(imagePath: string): Promise<void> {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
    }
  }

  // Lấy danh sách ảnh
  async getImages(): Promise<string[]> {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'images');
    this.ensureDirectoryExists(uploadDir);
    const files = await fs.promises.readdir(uploadDir);
    return files.map((file) => `/uploads/images/${file}`);
  }
}
