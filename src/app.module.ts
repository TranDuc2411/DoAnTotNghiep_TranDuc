import { UploadfileService } from './firebase/uploadfile.service';
import { AuthService } from './firebase/auth.service';
import { UploadfileController } from './firebase/uploadfile.controller';
import { AuthController } from './firebase/auth.controller';
import { FirebaseModule } from './firebase/firebase.module';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

const username = process.env.DB_USERNAME;
@Module({
  imports: [
    FirebaseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5433,
      username: process.env.DB_USERNAME || '01tranduc',
      password: process.env.DB_PASSWORD || '1234567Duc',
      database: process.env.DB_NAME || 'DB',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    ProductModule,
  ],
  controllers: [UploadfileController, AuthController, AppController],
  providers: [UploadfileService, AuthService, AppService],
})
export class AppModule {}
