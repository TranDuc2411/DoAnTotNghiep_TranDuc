import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { type } from 'os';
const serviceAccount = require('../../doantotnghiep-ce201-2beebf6fb546.json');

@Injectable()
export class FirebaseUploadService {
  private storageBucket: admin.storage.Storage;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'gs://doantotnghiep-ce201.appspot.com',
    });

    this.storageBucket = admin.storage();
  }

  async uploadFile(file: any): Promise<string> {
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
}
