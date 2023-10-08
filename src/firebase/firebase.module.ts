// firebase.module.ts

import { Module } from '@nestjs/common';
import { FirebaseAdminModule } from 'firebase-admin';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UploadController } from './uploadfile.controller';
import { UploadfileService } from './uploadfile.service';

@Module({
  imports: [FirebaseAdminModule.forRoot()],
  controllers: [AuthController, UploadController],
  providers: [AuthService, UploadfileService],
})
export class FirebaseModule {}
