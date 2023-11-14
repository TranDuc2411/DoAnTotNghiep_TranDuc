import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrderService } from './order.service';
import { OrderDTO } from './order.dto';
import { OrderProductDto } from './order-product.dto';
import { Order } from './order.entity';

// @UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Tạo order mới
  @Post('create')
  async createOrder(
    @Req() req,
    @Body() orderInfo: OrderDTO,
    @Body('products') products: OrderProductDto[],
  ): Promise<Order> {
    // const userId = req.user.userId;
    const userId = 1;
    const createdOrder = await this.orderService.createOrder(
      userId,
      orderInfo,
      products,
    );
    return createdOrder;
  }

  // Tìm tất cả các order của user hiện tại
  @Get()
  async findAllOrders(@Req() req): Promise<any> {
    // const userId = req.user.id;
    const userId = 1;
    return this.orderService.findAllOrdersByUserId(userId);
  }

  // Lấy chi tiết của một order
  @Get(':id')
  async getOrderDetail(@Param('id') orderId: number): Promise<any> {
    return this.orderService.getOrderDetail(orderId);
  }
  // Cập nhật thông tin đơn hàng

  @Put(':id/update')
  async updateOrder(
    @Param('id') orderId: number,
    @Body() updateOrderInfo: { status?: number } = {},
    @Req() req: any,
  ): Promise<Order> {
    const adminId = req.userId;

    // Thêm adminId vào updateOrderInfo nếu nó chưa có
    const updateOrderInfoData = { ...updateOrderInfo, adminId };

    // Gọi hàm updateOrder từ service và truyền thêm thông tin updateOrderInfoData
    return this.orderService.updateOrder(orderId, updateOrderInfoData);
  }
}
