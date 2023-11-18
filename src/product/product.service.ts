import { Injectable, Query } from '@nestjs/common';
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
  async searchProducts(
    @Query('productname') productname?: string,
    @Query('categoryid') categoryid?: number,
    @Query('status') status?: string,
    @Query('updateAt') updateAt?: Date,
  ): Promise<Product[]> {
    try {
      const conditions: any = {};

      if (productname !== undefined) {
        conditions.productname = ILike(`%${productname}%`);
      }

      // Kiểm tra giá trị của categoryid trước khi sử dụng nó
      if (categoryid !== undefined) {
        if (typeof categoryid === 'string') {
          conditions.categoryid = ILike(`%${categoryid}%`);
        } else {
          conditions.categoryid = categoryid;
        }
      }

      if (status) {
        conditions.status = ILike(`%${status}%`);
      }

      if (updateAt) {
        conditions.updateAt = updateAt;
      }

      return this.productRepository.find({ where: conditions });
    } catch (error) {
      throw new Error(`Error searching products: ${error.message}`);
    }
  }
  async searchProducts1(params: ProductDto): Promise<Product[]> {
    try {
      const conditions: any = {};

      if (params.productname !== undefined) {
        conditions.productname = ILike(`%${params.productname}%`);
      }

      // Kiểm tra giá trị của categoryid trước khi sử dụng nó
      if (
        params.categoryid !== undefined &&
        !isNaN(Number(params.categoryid))
      ) {
        conditions.categoryid = params.categoryid;
      }

      if (params.status !== undefined) {
        conditions.status = ILike(`%${params.status}%`);
      }

      if (params.updateat !== undefined) {
        conditions.updateat = params.updateat;
      }

      return this.productRepository.find({ where: conditions });
    } catch (error) {
      throw new Error(`Error searching products: ${error.message}`);
    }
  }
}
