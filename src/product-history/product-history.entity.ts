// src/modules/producthistory/producthistory.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

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

  @CreateDateColumn()
  createat: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'adminupdateid' })
  admin: User;

  // @ManyToOne(() => Product)
  // @JoinColumn({ name: 'productid' })
  // product: Product;
}
