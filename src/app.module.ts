import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { GoogleAuthModule } from './google-auth/google-auth.module';

const username = process.env.DB_USERNAME;
@Module({
  imports: [
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
    GoogleAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
