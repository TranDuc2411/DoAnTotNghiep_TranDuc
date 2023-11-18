import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductHistoryService } from './product-history.service';
import { ProductHistoryDto } from './product-history.dto';

@Controller('product-histories')
export class ProductHistoryController {
  constructor(private readonly productHistoryService: ProductHistoryService) {}

  // Lấy tất cả lịch sử sản phẩm
  @Get()
  async getAllProductHistories(): Promise<ProductHistoryDto[]> {
    return this.productHistoryService.getAllProductHistories();
  }

  // Lấy lịch sử sản phẩm theo ID
  @Get('product/:productId')
  async getProductHistoryById(
    @Param('productId') productid: number,
  ): Promise<ProductHistoryDto> {
    return this.productHistoryService.getProductHistoryById(productid);
  }

  //tìm kiếm các bản ghi lịch sử theo id admin
  @Get('admin/:adminId')
  async getProductHistoryByAdminId(
    @Param('adminId') adminId: number,
  ): Promise<ProductHistoryDto> {
    return this.productHistoryService.getProductHistoryByAdminId(adminId);
  }

  // Tạo mới lịch sử sản phẩm
  @Post()
  async createProductHistory(
    @Body() productHistoryDto: ProductHistoryDto,
  ): Promise<ProductHistoryDto> {
    return this.productHistoryService.createProductHistory(productHistoryDto);
  }

  // Cập nhật lịch sử sản phẩm
  @Put(':id')
  async updateProductHistory(
    @Param('id') id: number,
    @Body() updatedProductHistoryDto: ProductHistoryDto,
  ): Promise<ProductHistoryDto> {
    return this.productHistoryService.updateProductHistory(
      id,
      updatedProductHistoryDto,
    );
  }

  // Xóa lịch sử sản phẩm
  @Delete(':id')
  async deleteProductHistory(@Param('id') id: number): Promise<void> {
    return this.productHistoryService.deleteProductHistory(id);
  }
}
