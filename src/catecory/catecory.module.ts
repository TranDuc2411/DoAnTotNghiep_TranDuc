import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatecoryController } from './catecory.controller';
import { CatecoryService } from './catecory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './catecory.entity';
import { AuthAdminMiddleware } from 'src/middleware/auth-admin.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CatecoryController],
  providers: [CatecoryService],
})
export class CatecoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthAdminMiddleware).forRoutes(CatecoryController);
  }
}
