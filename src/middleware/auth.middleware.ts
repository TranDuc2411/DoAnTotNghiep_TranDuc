import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      // Lấy token từ tiêu đề Authorization
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) {
        // Trả về thông báo lỗi nếu không có header Authorization
        return res
          .status(401)
          .json({ message: 'Authorization header is missing' });
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        // Trả về thông báo lỗi nếu không có token
        return res.status(401).json({ message: 'Token is missing' });
      }

      // Giải mã và xác thực token
      try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        console.log(token);

        // Gắn thông tin user đã xác thực vào request
        req['user'] = decoded;
        console.log(req['user']);

        // Tiếp tục xử lý yêu cầu
        next();
      } catch (error) {
        // Trả về thông báo lỗi nếu token không hợp lệ
        return res.status(401).json({ message: 'Invalid token' });
      }
    } catch (error) {
      // Xử lý lỗi khi không thể đọc được header
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
