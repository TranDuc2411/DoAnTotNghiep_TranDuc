// user.dto.ts

import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  // @ApiProperty()
  @IsNumber()
  @IsOptional()
  role?: number; // Dấu '?' cho phép role là một trường tùy chọn

  @ApiProperty()
  @IsString()
  @IsOptional()
  email?: string; // Dấu '?' cho phép email là một trường tùy chọn
}
