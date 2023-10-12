import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { FirebaseUploadService } from './firebase-upload.service';

@Controller('firebase-upload')
export class FirebaseUploadController {
  constructor(private readonly firebaseService: FirebaseUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    const imageUrl = await this.firebaseService.uploadFile(file);
    return { imageUrl };
  }
}
