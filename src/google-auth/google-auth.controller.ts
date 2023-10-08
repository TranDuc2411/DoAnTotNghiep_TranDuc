import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthService } from './google-auth.service'; // Thay đổi đường dẫn nếu cần

@Controller('auth02')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('login')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res) {
    const user = req.user;
    const token = await this.googleAuthService.generateToken(user);
    // console.log(token);
    // Trả về đối tượng JSON chứa token
    // return { token };
    return res.json({ token });
  }
}
