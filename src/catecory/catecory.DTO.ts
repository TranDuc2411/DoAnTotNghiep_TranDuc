// category.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  namecatecory: string;
}
