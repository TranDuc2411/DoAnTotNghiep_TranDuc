import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthAdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      // Lấy token từ tiêu đề Authorization
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) {
        return res
          .status(401)
          .json({ message: 'Authorization header is missing' });
      }

      const token = authorizationHeader?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
      }

      // Giải mã và xác thực token
      try {
        const decoded = jwt.verify(
          token,
          process.env.TOKEN_KEY,
        ) as jwt.JwtPayload;

        if (!decoded) {
          return res.status(401).json({ message: 'Invalid token' });
        }

        if (decoded.role === 1) {
          console.log('admin :', token);
          // Gắn thông tin user đã xác thực vào request
          req['user'] = decoded;
          console.log(decoded);
          // Tiếp tục xử lý yêu cầu
          return next();
        }

        return res.status(401).json({
          message: 'Login with the admin account to use this feature!',
        });
      } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
