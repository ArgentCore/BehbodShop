import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query() query: FindProductsDto) {
    return this.productsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }
}