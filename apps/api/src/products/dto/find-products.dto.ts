import { IsOptional, IsString } from 'class-validator';

export class FindProductsDto {
  @IsOptional()
  @IsString()
  category?: string;
}