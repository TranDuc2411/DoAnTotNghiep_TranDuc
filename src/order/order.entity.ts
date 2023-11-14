import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity'; // Giả sử có một entity "User" đại diện cho bảng "user"
import { OrderProduct } from './order-product.entity';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'clientid' })
  clientId: number;

  @Column({ name: 'status', default: 0 })
  status: number;

  @Column({ name: 'adminid', nullable: true })
  adminId: number;

  @Column({ name: 'receiver' })
  receiver: string;

  @Column({ name: 'phonemunber' })
  phoneNumber: string;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'total' })
  total: number;

  @Column({ name: 'note' })
  note: string;

  @Column({ name: 'createat', type: 'date' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'clientid' })
  client: User;

  // Thêm mối quan hệ OneToMany với OrderProduct
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts: OrderProduct[];
  // You can add more relationships or methods here based on your application needs
}
