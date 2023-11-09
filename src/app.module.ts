import {
  Module,
  NestModule,
  MiddlewareConsumer,
  Next,
  Req,
  Res,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { UploadMiddleware } from './middleware/upload.middleware';
import { MulterModule } from '@nestjs/platform-express';
import { CatecoryModule } from './catecory/catecory.module';
import { Product } from './product/product.entity';
import { Category } from './catecory/catecory.entity';

const username = process.env.DB_USERNAME;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5433,
      username: process.env.DB_USERNAME || '01tranduc',
      password: process.env.DB_PASSWORD || '1234567Duc',
      database: process.env.DB_NAME || 'DB',
      entities: [User, Product, Category],
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    GoogleAuthModule,
    CatecoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // const parameterName = 'img';
    consumer.apply(UploadMiddleware['img']).forRoutes(AppController); // Áp dụng cho tất cả các tuyến đường trong AppModule
  }
}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     const parameterName = 'img';
//     consumer.apply(UploadMiddleware["img"]).forRoutes(AppController); // Áp dụng cho tất cả các tuyến đường trong AppModule
//   }
// }
