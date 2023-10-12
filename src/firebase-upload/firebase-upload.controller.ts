import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { FirebaseUploadService } from './firebase-upload.service';

@Controller('firebase-upload')
export class FirebaseUploadController {
  constructor(private readonly firebaseService: FirebaseUploadService) {}

  @Post('upload')
  async uploadFile(@UploadedFile() file: any) {
    const imageUrl = await this.firebaseService.uploadImage(file);
    return { imageUrl };
  }
}
