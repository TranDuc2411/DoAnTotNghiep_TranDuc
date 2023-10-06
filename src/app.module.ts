import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: '01tranduc',
      password: '1234567Duc',
      database: 'DB',
      entities: [],
      synchronize: true,
    }),
    UserModule, 
    ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
