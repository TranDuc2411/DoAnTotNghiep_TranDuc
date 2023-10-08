import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { time } from 'console';
dotenv.config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //registerUser
  async registerUser(
    username: string,
    password: string,
    email: string,
  ): Promise<User> {
    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException('Tên người dùng đã tồn tại');
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
    });

    return this.userRepository.save(newUser);
  }

  //login
  async loginUser(
    username: string,
    password: string,
  ): Promise<{ token: string }> {
    // Kiểm tra người dùng và mật khẩu ở đây

    // Nếu xác thực thành công, tạo token
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Tên người dùng không tồn tại');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Mật khẩu không đúng');
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '1h',
      },
    );

    return { token };
  }
}
