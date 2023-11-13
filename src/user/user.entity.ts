import { CartProduct } from 'src/cart/cart-product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // 0: client , 1:admin
  @Column({ default: 0 })
  role: number;

  @Column({ default: null })
  email: string;

  // Thêm mối quan hệ OneToMany với CartProduct
  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.user)
  cartProducts: CartProduct[];
}
