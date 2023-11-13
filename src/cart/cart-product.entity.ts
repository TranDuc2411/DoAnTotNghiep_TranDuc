// src/cart-product/cart-product.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Entity({ name: 'cartproduct' })
export class CartProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'productid' })
  productid: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'userid' })
  userid: number;

  @ManyToOne(() => Product, (product) => product.cartProducts)
  @JoinColumn({ name: 'productid' })
  product: Product;

  @ManyToOne(() => User, (user) => user.cartProducts)
  @JoinColumn({ name: 'userid' })
  user: User;
}
