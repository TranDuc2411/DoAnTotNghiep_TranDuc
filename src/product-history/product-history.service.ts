import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductHistory } from './product-history.entity';
import { ProductHistoryDto } from './product-history.dto';

@Injectable()
export class ProductHistoryService {
  constructor(
    @InjectRepository(ProductHistory)
    private readonly productHistoryRepository: Repository<ProductHistory>,
  ) {}

  // Lấy tất cả lịch sử sản phẩm
  async getAllProductHistories(): Promise<ProductHistoryDto[]> {
    const productHistories = await this.productHistoryRepository.find();
    return productHistories.map((history) => this.mapToDto(history));
  }

  // Lấy lịch sử sản phẩm theo ID
  async getProductHistoryById(productid: number): Promise<any> {
    const productHistory = await this.productHistoryRepository.find({
      where: { productid },
    });
    if (!productHistory) {
      throw new NotFoundException(
        `Không tìm thấy lịch sử sản phẩm với ID ${productid}`,
      );
    }
    return productHistory;
  }
  // Lấy lịch sử sản phẩm theo ID
  async getProductHistoryByAdminId(adminupdateid: number): Promise<any> {
    const productHistory = await this.productHistoryRepository.find({
      where: { adminupdateid },
    });
    if (!productHistory) {
      throw new NotFoundException(
        `Không tìm thấy lịch sử sản phẩm với ID ${adminupdateid}`,
      );
    }
    return productHistory;
  }

  // Tạo mới lịch sử sản phẩm
  async createProductHistory(
    productHistoryDto: ProductHistoryDto,
  ): Promise<ProductHistoryDto> {
    const productHistory =
      this.productHistoryRepository.create(productHistoryDto);
    const savedProductHistory =
      await this.productHistoryRepository.save(productHistory);
    return this.mapToDto(savedProductHistory);
  }

  // Cập nhật lịch sử sản phẩm
  async updateProductHistory(
    id: number,
    updatedProductHistoryDto: ProductHistoryDto,
  ): Promise<ProductHistoryDto> {
    const existingProductHistory = await this.getProductHistoryById(id);
    const mergedProductHistory = Object.assign(
      existingProductHistory,
      updatedProductHistoryDto,
    );
    const savedProductHistory =
      await this.productHistoryRepository.save(mergedProductHistory);
    return this.mapToDto(savedProductHistory);
  }

  // Xóa lịch sử sản phẩm
  async deleteProductHistory(id: number): Promise<void> {
    const productHistory = await this.getProductHistoryById(id);
    await this.productHistoryRepository.delete(productHistory);
  }

  // Ánh xạ lịch sử sản phẩm sang DTO
  private mapToDto(productHistory: ProductHistory): ProductHistoryDto {
    return {
      adminupdateid: productHistory.adminupdateid,
      productid: productHistory.productid,
      productname: productHistory.productname,
      title: productHistory.title,
      quantity: productHistory.quantity,
      prime: productHistory.prime,
      productdescription: productHistory.productdescription,
      status: productHistory.status,
      category: productHistory.category,
      createat: productHistory.createat,
    };
  }
}
