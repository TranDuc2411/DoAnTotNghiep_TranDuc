import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { UploadMiddleware } from './middleware/upload.middleware';
import { CatecoryModule } from './catecory/catecory.module';
import { Product } from './product/product.entity';
import { Category } from './catecory/catecory.entity';
import { ProductHistoryModule } from './product-history/product-history.module';
import { ProductHistory } from './product-history/product-history.entity';
import { CartProductModule } from './cart/cart-product.module';
import { CartProduct } from './cart/cart-product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5433,
      username: process.env.DB_USERNAME || '01tranduc',
      password: process.env.DB_PASSWORD || '1234567Duc',
      database: process.env.DB_NAME || 'DB',
      entities: [User, Product, Category, ProductHistory, CartProduct],
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    GoogleAuthModule,
    CatecoryModule,
    ProductHistoryModule,
    CartProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) =>
        new UploadMiddleware('img').use(req, res, next),
      )
      .forRoutes(AppController);
  }
}
