import { Module } from '@nestjs/common';
import { CatecoryController } from './catecory.controller';
import { CatecoryService } from './catecory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './catecory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CatecoryController],
  providers: [CatecoryService],
})
export class CatecoryModule {}
