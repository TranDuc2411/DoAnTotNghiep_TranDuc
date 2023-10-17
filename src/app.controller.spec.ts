// // import { Test, TestingModule } from '@nestjs/testing';
// // import { AppController } from './app.controller';
// // import { AppService } from './app.service';

// // describe('AppController', () => {
// //   let appController: AppController;

// //   beforeEach(async () => {
// //     const app: TestingModule = await Test.createTestingModule({
// //       controllers: [AppController],
// //       providers: [AppService],
// //     }).compile();

// //     appController = app.get<AppController>(AppController);
// //   });

// //   describe('root', () => {
// //     it('should return "Hello fucking World!"', () => {
// //       // expect(appController.getHello()).toBe('Hello fucking World!');
// //     });
// //   });
// // });
// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';
// import * as multer from 'multer';
// import * as path from 'path';

// @Injectable()
// export class FileUploadMiddleware implements NestMiddleware {
//   private upload: multer.Instance;

//   constructor() {
//     // Thiết lập tùy chỉnh cho multer
//     this.upload = multer({
//       storage: multer.diskStorage({
//         destination: 'uploads', // Thư mục tạm để lưu trữ tệp
//         filename: (req, file, cb) => {
//           const extname = path.extname(file.originalname);
//           cb(null, `${Date.now()}${extname}`); // Đổi tên tệp để tránh trùng lặp
//         },
//       }),
//     });
//   }

//   use(req: Request, res: Response, next: NextFunction) {
//     // Sử dụng middleware multer để xử lý tải lên
//     this.upload.single('file')(req, res, (err: any) => {
//       if (err) {
//         return res.status(400).json({ message: 'Lỗi tải lên tệp.' });
//       }

//       // Kiểm tra xem tệp đã được tải lên chưa
//       if (!req.body.file) {
//         return res
//           .status(400)
//           .json({ message: 'Vui lòng chọn một tệp để tải lên.' });
//       }

//       // Lưu trữ đường dẫn tới tệp đã tải lên trong req.body.imageUrl
//       req.body.imageUrl = `/uploads/${req.body.file.filename}`;

//       // Chuyển yêu cầu đến middleware hoặc endpoint tiếp theo
//       next();
//     });
//   }
// }
