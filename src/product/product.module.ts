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
import { UploadMiddleware } from 'src/middleware/upload.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductHistory])],
  controllers: [ProductController],
  providers: [ProductService, ProductHistoryService],
})
export class ProductModule {}
// export class ProductModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes(ProductController);
//     consumer
//       .apply((req, res, next) =>
//         new UploadMiddleware('urlimg').use(req, res, next),
//       )
//       .forRoutes(
//         { path: 'product/create1', method: RequestMethod.POST },
//         { path: 'product/:id/save', method: RequestMethod.PUT },
//       );
//   }
// }
