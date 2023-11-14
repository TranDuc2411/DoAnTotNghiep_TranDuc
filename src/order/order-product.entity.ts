import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../product/product.entity';

@Entity({ name: 'orderproduct' })
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productid: number;

  @Column()
  orderid: number;

  @Column()
  quantity: number;

  // Thêm mối quan hệ ManyToOne với Order
  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;

  // Thêm mối quan hệ ManyToOne với Product
  @ManyToOne(() => Product, (product) => product.orderProducts)
  product: Product;
}
