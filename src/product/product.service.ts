import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm'; // Thêm `Like` và `ILike` để thực hiện tìm kiếm không phân biệt chữ hoa/chữ thường
import { Product } from './product.entity';
import { ProductDto } from './producr.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Tạo mới sản phẩm
  async create(productDto: ProductDto): Promise<Product> {
    const product = this.productRepository.create(productDto);

    return this.productRepository.save(product);
  }

  // Lấy danh sách tất cả sản phẩm
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // Lấy thông tin sản phẩm theo ID
  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  // Cập nhật thông tin sản phẩm
  async update(id: number, productDto: ProductDto): Promise<Product> {
    await this.productRepository.update(id, productDto);
    return this.productRepository.findOne({ where: { id } });
  }

  // Xóa sản phẩm
  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  // Tìm kiếm sản phẩm dựa trên các tham số
  // Tìm kiếm sản phẩm dựa trên các tham số
  async searchProducts(
    productname: string,
    categoryid: number,
    status: string,
  ): Promise<Product[]> {
    try {
      const conditions: any = {};
      if (productname) {
        conditions.productname = ILike(`%${productname}%`);
      }
      if (categoryid) {
        conditions.categoryid = categoryid;
      }
      if (status) {
        conditions.status = status;
      }

      return this.productRepository.find({ where: conditions });
    } catch (error) {
      // Nếu có lỗi, bắt và trả về thông báo lỗi
      throw new Error(`Error searching products: ${error.message}`);
    }
  }
}
