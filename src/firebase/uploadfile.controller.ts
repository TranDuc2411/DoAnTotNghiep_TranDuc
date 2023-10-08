// upload.controller.ts

import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadfileService } from './uploadfile.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadfileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Sử dụng Firebase Admin SDK để tải lên tệp lên Firebase Storage
  }
}