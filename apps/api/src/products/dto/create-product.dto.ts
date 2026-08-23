import { IsBoolean, IsInt, IsOptional, IsString, IsUUID, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  title!: string;

  @IsString()
  @MinLength(2)
  slug!: string;

  @IsString()
  @MinLength(10)
  description!: string;

  @IsInt()
  @Min(0)
  priceToman!: number;

  @IsInt()
  @Min(0)
  stock!: number;

  @IsUUID()
  categoryId!: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}