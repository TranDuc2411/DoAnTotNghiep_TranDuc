// app.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/demo1')
  Demo(@Req() request: Request) {
    const { fileUrl, username, password } = request.body; // Trích xuất username, password và fileUrl từ dữ liệu đầu vào

    console.log('File URL:', fileUrl);
    console.log('Username:', username);
    console.log('Password:', password);

    // Bạn có thể sử dụng thông tin này cho xử lý tiếp theo nếu cần

    return 'okok';
  }
  @Post('/demo2')
  Demo1(@Req() request: Request) {
    const { fileUrl, name, fuckingname } = request.body; // Trích xuất username, password và fileUrl từ dữ liệu đầu vào

    console.log('File URL:', fileUrl);
    console.log('name:', name);
    console.log('fuckingname:', fuckingname);

    // Bạn có thể sử dụng thông tin này cho xử lý tiếp theo nếu cần

    return 'demo2';
  }
}
