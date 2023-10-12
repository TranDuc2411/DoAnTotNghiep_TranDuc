import { Module } from '@nestjs/common';
import { FirebaseUploadService } from './firebase-upload.service';
import { FirebaseUploadController } from './firebase-upload.controller';

@Module({
  providers: [FirebaseUploadService],
  controllers: [FirebaseUploadController],
})
export class FirebaseUploadModule {}
