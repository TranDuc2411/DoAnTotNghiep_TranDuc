// catecory.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CatecoryService } from './catecory.service';
import { CategoryDto } from './catecory.dto';

@Controller('catecory')
export class CatecoryController {
  constructor(private readonly catecoryService: CatecoryService) {}

  @Get()
  async getAllCatecories(): Promise<CategoryDto[]> {
    return this.catecoryService.getAllCatecories();
  }

  @Get(':id')
  async getCatecoryById(@Param('id') id: number): Promise<CategoryDto> {
    return this.catecoryService.getCatecoryById(id);
  }

  @Post('/create')
  async createCatecory(@Body() categoryDto: CategoryDto): Promise<CategoryDto> {
    return this.catecoryService.createCatecory(categoryDto);
  }

  @Put(':id')
  async updateCatecory(
    @Param('id') id: number,
    @Body() categoryDto: CategoryDto,
  ): Promise<CategoryDto> {
    return this.catecoryService.updateCatecory(id, categoryDto);
  }

  @Delete(':id')
  async deleteCatecory(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.catecoryService.deleteCatecory(id);
      return { message: 'Category deleted successfully.' };
    } catch (error) {
      return {
        message: `Failed to delete category. ${error.message || error}`,
      };
    }
  }
}
