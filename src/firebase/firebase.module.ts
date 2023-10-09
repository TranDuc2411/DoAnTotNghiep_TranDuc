import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FirebaseService } from './firebase.service';
import { UploadsController } from './firebase.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Thư mục tạm thời để lưu trữ tệp tải lên
    }),
  ],
  controllers: [UploadsController],
  providers: [FirebaseService],
})
export class UploadsModule {}
