import { Module } from '@nestjs/common';
import { ProductHistoryController } from './product-history.controller';
import { ProductHistoryService } from './product-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductHistory } from './product-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductHistory])],
  controllers: [ProductHistoryController],
  providers: [ProductHistoryService],
})
export class ProductHistoryModule {}
