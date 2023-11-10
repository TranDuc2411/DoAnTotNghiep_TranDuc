// src/modules/producthistory/producthistory.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity'; // Đảm bảo bạn có đường dẫn đúng đến file user.entity.ts
import { Product } from '../product/product.entity'; // Đảm bảo bạn có đường dẫn đúng đến file product.entity.ts

@Entity({ name: 'producthistory' })
export class ProductHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adminupdateid: number;

  @Column()
  productid: number;

  @Column()
  productname: string;

  @Column()
  title: string;

  @Column()
  quantity: string;

  @Column()
  prime: number;

  @Column()
  productdescription: string;

  @Column()
  status: string;

  @Column()
  category: string;

  @Column({ type: 'date' })
  column1: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'adminupdateid' })
  admin: User;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productid' })
  product: Product;
}
