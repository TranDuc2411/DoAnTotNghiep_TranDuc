import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class GoogleAuthService {
  async generateToken(user: any): Promise<string> {
    const payload = { sub: user.displayName, email: user.email, role: 0 };
    const token = jwt.sign(payload, process.env.TOKEN_KEY, {
      expiresIn: '1h',
    });
    return token;
  }
}
