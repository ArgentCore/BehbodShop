import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [PrismaModule, ProductsModule, CategoriesModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}