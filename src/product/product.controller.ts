import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './producr.dto';
import { ProductHistoryDto } from 'src/product-history/product-history.dto';
import { ProductHistoryService } from 'src/product-history/product-history.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productHistoryService: ProductHistoryService,
  ) {}

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

  // API tạo mới sản phẩm và lưu lịch sử sản phẩm
  @Post('create1')
  async create1(@Body() productDto: ProductDto, @Request() req: any) {
    // Tạo một promise cho mỗi hàm cần gọi
    const createProductPromise = this.productService.create(productDto);

    const productHistoryDto: ProductHistoryDto = {
      // Tạo đối tượng ProductHistoryDto từ productDto tùy theo yêu cầu
      adminupdateid: req.user.userId,
      productid: (await createProductPromise).id,
      productname: productDto.productname,
      title: productDto.title,
      quantity: String(productDto.quantity),
      prime: productDto.prime,
      productdescription: productDto.productdescription,
      status: productDto.status,
      category: String(productDto.categoryid),
      column1: productDto.updateat, // Giả sử bạn muốn sử dụng trường `updateat` từ `ProductDto1` cho `column1` trong `ProductHistoryDto`

      // Các trường khác nếu có
    };

    const createProductHistoryPromise =
      this.productHistoryService.createProductHistory(productHistoryDto);

    // Gọi cả hai hàm cùng một lúc và đợi chúng hoàn thành
    const [createdProduct, createdProductHistory] = await Promise.all([
      createProductPromise,
      createProductHistoryPromise,
    ]);

    // Tùy thuộc vào logic của bạn, bạn có thể trả về một đối tượng chứa thông tin của cả hai hàm hoặc chỉ một phần nếu cần
    return {
      createdProduct,
      // createdProductHistory,
    };
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

  // update and save history
  @Put(':id/save-history')
  async updateAndSaveHistory(
    @Param('id') id: number,
    @Body() productDto: ProductDto,
    @Request() req: any,
  ) {
    // Thực hiện logic cập nhật sản phẩm (update)
    const updatedProduct = await this.productService.update(id, productDto);

    // Tạo đối tượng ProductHistoryDto từ thông tin sản phẩm cập nhật
    const productHistoryDto: ProductHistoryDto = {
      adminupdateid: req.user.userId,
      productid: id,
      productname: updatedProduct.productname,
      title: updatedProduct.title,
      quantity: String(updatedProduct.quantity),
      prime: updatedProduct.prime,
      productdescription: updatedProduct.productdescription,
      status: updatedProduct.status,
      category: String(updatedProduct.categoryid),
      column1: updatedProduct.updateat,
      // Các trường khác nếu có
    };

    // Tạo lịch sử sản phẩm
    const createdProductHistory =
      await this.productHistoryService.createProductHistory(productHistoryDto);

    // Tùy thuộc vào logic của bạn, bạn có thể trả về một đối tượng chứa thông tin của cả hai hàm hoặc chỉ một phần nếu cần
    return {
      updatedProduct,
      // createdProductHistory,
    };
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
