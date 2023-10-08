import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google-auth.strategy'; // Thay đổi đường dẫn nếu cần
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'google' })],
  controllers: [GoogleAuthController],
  providers: [GoogleStrategy, GoogleAuthService],
})
export class GoogleAuthModule {}
