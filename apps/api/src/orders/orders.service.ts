import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async checkout(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('سبد خرید شما خالی است');
    }

    const totalToman = cart.items.reduce(
      (sum, item) => sum + item.product.priceToman * item.quantity,
      0,
    );

    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          totalToman,
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              titleSnapshot: item.product.title,
              priceSnapshot: item.product.priceToman,
              quantity: item.quantity,
            })),
          },
        },
        include: { items: true },
      });

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return order;
    });
  }

  findAll(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    });
  }
}