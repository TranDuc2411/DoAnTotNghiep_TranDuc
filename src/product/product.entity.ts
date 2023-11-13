import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Category } from '../catecory/catecory.entity'; // Đảm bảo rằng bạn có một file category.entity.ts đã được tạo
import { CartProduct } from 'src/cart/cart-product.entity';

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
}
