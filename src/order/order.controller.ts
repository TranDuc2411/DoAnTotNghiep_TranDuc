import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  Post,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
  Query,
  NotFoundException,
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
  @Get('all')
  async findAllOrders(@Req() req): Promise<any> {
    const userId = req.user.id;
    // const userId = 1;
    return this.orderService.findAllOrdersByUserId(userId);
  }

  // Lấy chi tiết của một order
  @Get('/detail/:id')
  async getOrderDetail(@Param('id') orderId: number): Promise<any> {
    return this.orderService.getOrderDetail(orderId);
  }
  // Cập nhật thông tin đơn hàng

  // API cập nhật đơn hàng
  @Put(':id/update')
  async updateOrder(
    @Param('id') orderId: number,
    @Body() updateOrderInfo: { status?: number } = {},
    @Req() req: any,
  ): Promise<Order> {
    const adminId = req.user.userId;

    // Thêm adminId vào updateOrderInfo nếu nó chưa có
    const updateOrderInfoData = { ...updateOrderInfo, adminId };

    try {
      // Gọi hàm updateOrder từ service và truyền thêm thông tin updateOrderInfoData
      return this.orderService.updateOrder(orderId, updateOrderInfoData);
    } catch (error) {
      // Nếu có lỗi, trả về một đối tượng chứa thông báo lỗi và mã lỗi HTTP tương ứng
      throw new HttpException(
        {
          message: 'Lỗi cập nhật đơn hàng',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // API tìm kiếm đơn hàng dựa trên các tham số
  @Get('search')
  async searchOrders(
    @Query('status') status?: number,
    @Query('clientId') clientId?: number,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ): Promise<Order[]> {
    try {
      const orders = await this.orderService.searchOrders(
        status,
        clientId,
        startDate,
        endDate,
      );
      return orders;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi khi tìm kiếm đơn hàng',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
