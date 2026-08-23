import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(query: FindProductsDto) {
    return this.prisma.product.findMany({
      where: {
        isActive: true,
        ...(query.category ? { category: { slug: query.category } } : {}),
      },
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    });
  }

  async create(dto: CreateProductDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new BadRequestException('دسته‌بندی انتخاب‌شده وجود ندارد');
    }

    const existingSlug = await this.prisma.product.findUnique({
      where: { slug: dto.slug },
    });

    if (existingSlug) {
      throw new ConflictException('این نامک (slug) قبلاً استفاده شده است');
    }

    return this.prisma.product.create({ data: dto });
  }
}