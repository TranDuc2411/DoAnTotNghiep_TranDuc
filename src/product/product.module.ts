import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { ProductHistoryService } from 'src/product-history/product-history.service';
import { ProductHistory } from 'src/product-history/product-history.entity';
import { AuthAdminMiddleware } from 'src/middleware/auth-admin.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductHistory])],
  controllers: [ProductController],
  providers: [ProductService, ProductHistoryService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthAdminMiddleware).forRoutes(ProductController);
  }
}
