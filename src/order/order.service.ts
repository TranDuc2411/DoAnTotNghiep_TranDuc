import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderProduct } from './order-product.entity';
import { OrderDTO } from './order.dto';
import { OrderProductDto } from './order-product.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
  ) {}

  async createOrder(
    userId: number,
    orderInfo: OrderDTO,
    products: OrderProductDto[],
  ): Promise<Order> {
    // Tạo order từ OrderDTO
    const order = this.orderRepository.create({
      clientId: userId,
      ...orderInfo,
    });

    // Lưu order vào database
    const savedOrder = await this.orderRepository.save(order);

    // Tạo các sản phẩm từ OrderProductDto và liên kết với order
    const orderProducts = products.map((productDto) => {
      return this.orderProductRepository.create({
        orderid: savedOrder.id, // Đã sửa ở đây
        ...productDto,
      });
    });

    // Lưu thông tin sản phẩm vào database
    try {
      // Lưu thông tin sản phẩm vào database
      await this.orderProductRepository.save(orderProducts);
      console.log('Sản phẩm đã được tạo và lưu thành công.');
    } catch (error) {
      console.error('Đã xảy ra lỗi khi tạo hoặc lưu sản phẩm:', error);
      // Thực hiện xử lý lỗi khác nếu cần thiết
    }
    return savedOrder;
  }

  async findAllOrdersByUserId(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: {
        clientId: userId,
      },
    });
  }

  async getOrderDetail(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    // Lấy thông tin orderProducts
    const orderProducts = await this.orderProductRepository.find({
      where: { orderid: order.id },
    });

    // Lặp qua các sản phẩm trong orderProducts và lấy thông tin chi tiết của sản phẩ

    // Gán danh sách orderProducts vào order
    order.orderProducts = orderProducts;

    return order;
  }

  // admin Cập nhật thông tin đơn hàng
  async updateOrder(
    orderId: number,
    updateOrderInfo: { adminId?: number; status?: number },
  ): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    // Cập nhật các thuộc tính mới
    if (updateOrderInfo.adminId !== undefined) {
      order.adminId = updateOrderInfo.adminId;
    }

    if (updateOrderInfo.status !== undefined) {
      order.status = updateOrderInfo.status;
    }

    // Lưu lại đơn hàng đã được cập nhật
    const updatedOrder = await this.orderRepository.save(order);

    return updatedOrder;
  }
}
