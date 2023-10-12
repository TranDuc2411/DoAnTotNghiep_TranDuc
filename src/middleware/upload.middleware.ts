/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { FirebaseUploadService } from 'src/firebase-upload/firebase-upload.service';

@Injectable()
export class UploadMiddleware implements NestMiddleware {
  constructor(private readonly firebaseService: FirebaseUploadService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body.file) {
      const uploadedImageUrls = await Promise.all(
        req.body.file.map(async (file) => {
          return this.firebaseService.uploadFile(file);
        }),
      );

      req.body.imageUrls = uploadedImageUrls; // Lưu trữ URL ảnh tải lên trong đối tượng yêu cầu
    }
    next();
  }
}
