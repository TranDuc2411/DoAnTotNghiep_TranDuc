// src/modules/producthistory/producthistory.service.ts
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

  async getAllProductHistories(): Promise<ProductHistoryDto[]> {
    const productHistories = await this.productHistoryRepository.find();
    return productHistories.map((history) => this.mapToDto(history));
  }

  async getProductHistoryById(id: number): Promise<ProductHistoryDto> {
    const productHistory = await this.productHistoryRepository.findOne({
      where: { id },
    });
    if (!productHistory) {
      throw new NotFoundException(`Product history with ID ${id} not found`);
    }
    return this.mapToDto(productHistory);
  }

  async createProductHistory(
    productHistoryDto: ProductHistoryDto,
  ): Promise<ProductHistoryDto> {
    const productHistory =
      this.productHistoryRepository.create(productHistoryDto);
    const savedProductHistory =
      await this.productHistoryRepository.save(productHistory);
    return this.mapToDto(savedProductHistory);
  }

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

  async deleteProductHistory(id: number): Promise<void> {
    const productHistory = await this.getProductHistoryById(id);
    await this.productHistoryRepository.delete(productHistory);
  }

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
      column1: productHistory.column1,
    };
  }
}
