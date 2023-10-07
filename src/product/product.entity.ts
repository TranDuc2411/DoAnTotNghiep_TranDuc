import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productname: string;

  @Column()
  prime: string;

  @Column()
  count: string;

  @Column()
  dicription: string;
}
