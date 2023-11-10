// catecory.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './catecory.entity';
import { CategoryDto } from './catecory.dto';

@Injectable()
export class CatecoryService {
  constructor(
    @InjectRepository(Category)
    private readonly catecoryRepository: Repository<Category>,
  ) {}

  async getAllCatecories(): Promise<CategoryDto[]> {
    const categories = await this.catecoryRepository.find();
    return categories.map((category) => this.mapToDto(category));
  }

  async getCatecoryById(id: number): Promise<CategoryDto> {
    const category = await this.catecoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.mapToDto(category);
  }

  async createCatecory(categoryDto: CategoryDto): Promise<CategoryDto> {
    const category = this.mapDtoToEntity(categoryDto);
    const savedCategory = await this.catecoryRepository.save(category);
    return this.mapToDto(savedCategory);
  }

  async updateCatecory(
    id: number,
    updatedCategoryDto: CategoryDto,
  ): Promise<CategoryDto> {
    const existingCategory = await this.getCatecoryById(id);
    const updatedCategory = this.mapDtoToEntity(updatedCategoryDto);

    // Copy updated fields to the existingCategory
    existingCategory.namecatecory = updatedCategory.namecatecory;

    const savedCategory = await this.catecoryRepository.save(existingCategory);
    return this.mapToDto(savedCategory);
  }

  async deleteCatecory(id: number): Promise<void> {
    await this.getCatecoryById(id); // Ensure category exists
    await this.catecoryRepository.delete(id);
  }

  private mapToDto(category: Category): CategoryDto {
    return {
      id: category.id,
      namecatecory: category.namecatecory,
    };
  }

  private mapDtoToEntity(categoryDto: CategoryDto): Category {
    const { id, namecatecory } = categoryDto;
    return { id, namecatecory, products: [] }; // Thay [] bằng giá trị thích hợp nếu cần
  }
}
