import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Category } from '../catecory/catecory.entity';
import { CartProduct } from 'src/cart/cart-product.entity';
import { OrderProduct } from 'src/order/order-product.entity'; // Đảm bảo rằng bạn có một file order-product.entity.ts đã được tạo

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryid: number;

  @Column()
  productname: string;

  @Column()
  title: string;

  @Column()
  quantity: number;

  @Column()
  prime: number;

  @Column()
  productdescription: string;

  @Column()
  status: string;

  @Column()
  urlimg: string;

  @Column()
  updateat: Date;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryid' })
  category: Category;

  // Thêm mối quan hệ OneToMany với CartProduct
  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product)
  cartProducts: CartProduct[];

  // Thêm mối quan hệ OneToMany với OrderProduct
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];
}
