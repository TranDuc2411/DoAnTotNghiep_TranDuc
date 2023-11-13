import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './producr.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // API kiểm thử
  @Get('test')
  async test() {
    console.log('okok');
  }

  // API tạo mới sản phẩm
  @Post('create')
  async create(@Body() productDto: ProductDto) {
    return this.productService.create(productDto);
  }

  // API lấy danh sách tất cả sản phẩm
  @Get('getall')
  async findAll() {
    return this.productService.findAll();
  }

  // API lấy thông tin sản phẩm theo ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  // API cập nhật thông tin sản phẩm
  @Put(':id')
  async update(@Param('id') id: number, @Body() productDto: ProductDto) {
    return this.productService.update(id, productDto);
  }

  // API xóa sản phẩm
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }

  // API tìm kiếm sản phẩm dựa trên các tham số
  @Get('search')
  async searchProducts(
    @Query('productname') productname: string,
    @Query('categoryid') categoryid: number,
    @Query('status') status: string,
  ) {
    // Thực hiện tìm kiếm sử dụng các tham số truyền vào
    return this.productService.searchProducts(productname, categoryid, status);
  }
}
