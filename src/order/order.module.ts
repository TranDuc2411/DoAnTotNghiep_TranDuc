import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderProduct } from './order-product.entity';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { AuthAdminMiddleware } from 'src/middleware/auth-admin.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderProduct])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(OrderController);
    consumer.apply(AuthAdminMiddleware).forRoutes({
      path: 'orders/:id/update',
      method: RequestMethod.PUT,
    });
  }
}
