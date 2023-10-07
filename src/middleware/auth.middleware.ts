import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Lấy token từ tiêu đề Authorization
    const token = req.headers.authorization;
    console.log('fuck token');

    if (!token) {
      // Trả về thông báo lỗi nếu không có token
      return res.status(401).json({ message: 'Token is missing' });
    }

    // Giải mã và xác thực token
    try {
      const decoded = jwt.verify(token, '01tranducKey');
      console.log(token);

      // Gắn thông tin user đã xác thực vào request
      req['user'] = decoded;

      // Tiếp tục xử lý yêu cầu
      next();
    } catch (error) {
      // Trả về thông báo lỗi nếu token không hợp lệ
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
