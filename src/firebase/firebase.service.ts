import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MulterFile } from '@nestjs/platform-express';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private storage = admin.storage().bucket();

  async uploadFile(file: MulterFile): Promise<string> {
    try {
      const uniqueFileName = `${Date.now()}_${file.originalname}`;
      const fileUpload = this.storage.file(uniqueFileName);

      await fileUpload.save(file.buffer, {
        metadata: {
          contentType: file.mimetype,
        },
      });

      const publicUrl = `https://storage.googleapis.com/${this.storage.name}/${uniqueFileName}`;
      return publicUrl;
    } catch (error) {
      throw new HttpException(
        'Could not upload file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
