import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
const multer = require('multer');
const fs = require('fs');
const path = require('path'); // Import module path
import * as admin from 'firebase-admin';
const serviceAccount = require('../../doantotnghiep-ce201-2beebf6fb546.json');

@Injectable()
export class UploadMiddleware implements NestMiddleware {
  private upload = multer.Instance;
  private storageBucket: admin.storage.Storage;

  constructor(private filename: string) {
    // if (!fs.existsSync('./uploads')) {
    //   fs.mkdirSync('./uploads');
    // }

    this.upload = multer({
      // dest: './uploads',
      storage: multer.memoryStorage(), // Sử dụng memoryStorage để lưu trữ tệp tải lên tạm thời trong bộ nhớ
    });

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'gs://doantotnghiep-ce201.appspot.com',
    });

    this.storageBucket = admin.storage();
  }

  // hàm xử lý đẩy ảnh lên firebase
  async uploadFileToFirebase(file: any): Promise<string> {
    const destination = `images/${file.originalname}`;
    const fileUpload = this.storageBucket.bucket().file(destination);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise<string>((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', () => {
        fileUpload
          .makePublic()
          .then(() => {
            const imageUrl = `https://storage.googleapis.com/${
              this.storageBucket.bucket().name
            }/${destination}`;
            resolve(imageUrl);
          })
          .catch((error) => {
            reject(error);
          });
      });

      stream.end(file.buffer);
    });
  }

  //hàm chính xử lý file của middleware
  use(req: Request, res: Response, next: NextFunction) {
    // this.parameterName = 'img';
    console.log(this.filename);
    console.log();
    this.upload.single(this.filename)(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Lỗi tải lên tệp');
      }

      if (req.file) {
        try {
          const imageUrl = await this.uploadFileToFirebase(req.file);
          // console.log('URL của tệp đã tải lên:', imageUrl);
          req.body.fileUrl = imageUrl;
        } catch (error) {
          console.error('Lỗi tải lên tệp lên Firebase:', error);
          return res.status(500).send('Lỗi tải lên tệp lên Firebase');
        }
      }

      next();
    });
  }
}
