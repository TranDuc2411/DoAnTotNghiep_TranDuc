import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../product/product.entity'; // Đảm bảo rằng bạn đã tạo một file product.entity.ts

@Entity({ name: 'catecory' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  namecatecory: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
