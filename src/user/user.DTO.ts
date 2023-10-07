// user.dto.ts

import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsNumber()
  @IsOptional()
  role?: number; // Dấu '?' cho phép role là một trường tùy chọn

  @IsString()
  @IsOptional()
  email?: string; // Dấu '?' cho phép email là một trường tùy chọn
}
