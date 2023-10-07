import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './middleware/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Đăng ký middleware ở đây
  // app.use(AuthMiddleware);

  await app.listen(3000);
}
bootstrap();
