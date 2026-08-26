import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthRequest {
  user: { userId: string };
}

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  checkout(@Request() req: AuthRequest) {
    return this.ordersService.checkout(req.user.userId);
  }

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.ordersService.findAll(req.user.userId);
  }
}