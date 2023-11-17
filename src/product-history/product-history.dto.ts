// src/modules/producthistory/producthistory.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

export class ProductHistoryDto {
  @IsNotEmpty()
  @IsNumber()
  adminupdateid: number;

  @IsNotEmpty()
  @IsNumber()
  productid: number;

  @IsNotEmpty()
  @IsString()
  productname: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  quantity: string;

  @IsNotEmpty()
  @IsNumber()
  prime: number;

  @IsNotEmpty()
  @IsString()
  productdescription: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsDate()
  @CreateDateColumn()
  createat: Date;
}
