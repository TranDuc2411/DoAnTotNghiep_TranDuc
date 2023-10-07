import {
  Controller,
  Post,
  Get,
  Body,
  ValidationPipe,
  UseGuards, // Sử dụng UseGuards thay vì UseMiddleware
  Request, // Import Request để truy cập thông tin user từ middleware
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { AuthMiddleware } from '../middleware/auth.middleware';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body(ValidationPipe) userDto: UserDto): Promise<UserDto> {
    const { username, password, email } = userDto;
    const newUser = await this.userService.registerUser(
      username,
      password,
      email,
    );
    return newUser;
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) userDto: UserDto,
  ): Promise<{ token: string }> {
    const { username, password } = userDto;
    const { token } = await this.userService.loginUser(username, password);
    return { token };
  }

  @Get('demo')
  async demo(@Request() req: any) {
    return { message: 'okok' };
  }
}
