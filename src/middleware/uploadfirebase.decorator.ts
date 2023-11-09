import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import * as admin from 'firebase-admin';
const serviceAccount = require('../../doantotnghiep-ce201-2beebf6fb546.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://doantotnghiep-ce201.appspot.com',
});

// Hàm xử lý đẩy ảnh lên Firebase
async function uploadFileToFirebase(file: any): Promise<string> {
  const storageBucket = admin.storage();
  const destination = `images/${file.originalname}`;
  const fileUpload = storageBucket.bucket().file(destination);

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
            storageBucket.bucket().name
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

// Tạo decorator
export const FirebaseFileUpload = createParamDecorator(
  async (_, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest();
    if (!req.body.file) {
      return null;
    }

    try {
      const imageUrl = await uploadFileToFirebase(req.file);
      return imageUrl;
    } catch (error) {
      throw new Error('Lỗi tải lên tệp lên Firebase: ' + error);
    }
  },
);
