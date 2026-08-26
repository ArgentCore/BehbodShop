import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthRequest {
  user: { userId: string };
}

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Request() req: AuthRequest) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post('items')
  addItem(@Request() req: AuthRequest, @Body() dto: AddCartItemDto) {
    return this.cartService.addItem(req.user.userId, dto);
  }

  @Delete('items/:productId')
  removeItem(@Request() req: AuthRequest, @Param('productId') productId: string) {
    return this.cartService.removeItem(req.user.userId, productId);
  }
}