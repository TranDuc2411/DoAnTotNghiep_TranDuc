import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseUploadService {
  private storageBucket: admin.storage.Storage;
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(
        './doantotnghiep-ce201-2beebf6fb546.json',
      ),
      storageBucket: 'gs://doantotnghiep-ce201.appspot.com', // Thay thế bằng URL của Firebase Storage Bucket
    });

    this.storageBucket = admin.storage();
  }

  async uploadImage(file: any): Promise<string> {
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
        const imageUrl = `https://storage.googleapis.com/${
          this.storageBucket.bucket().name
        }/${destination}`;
        resolve(imageUrl);
      });

      stream.end(file.buffer);
    });
  }
}
