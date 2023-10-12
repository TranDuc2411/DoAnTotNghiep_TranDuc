import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

import { MulterModule } from '@nestjs/platform-express/multer';
async function bootstrap() {
  // API doc
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Do An Tot Nghiep - Tran Ngoc Minh Duc')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('User')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // config môi trường
  dotenv.config();

  // cấu hình muler upload file tạm thời
  // Cấu hình Multer
  // app.use(
  //   MulterModule.register({
  //     dest: './uploads',
  //   }),
  // );

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
