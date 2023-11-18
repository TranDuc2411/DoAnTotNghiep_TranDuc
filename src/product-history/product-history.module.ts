import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductHistoryController } from './product-history.controller';
import { ProductHistoryService } from './product-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductHistory } from './product-history.entity';
import { AuthAdminMiddleware } from 'src/middleware/auth-admin.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([ProductHistory])],
  controllers: [ProductHistoryController],
  providers: [ProductHistoryService],
})
export class ProductHistoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthAdminMiddleware).forRoutes(ProductHistoryController);
  }
}
