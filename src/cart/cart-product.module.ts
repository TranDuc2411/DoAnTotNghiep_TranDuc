import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CartProductController } from './cart-product.controller';
import { CartProduct } from './cart-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Product } from 'src/product/product.entity';
// import { User } from 'src/user/user.entity';
import { CartProductService } from './cart-product.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartProduct, User, Product])],
  controllers: [CartProductController],
  providers: [CartProductService],
})
export class CartProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CartProductController);
  }
}
