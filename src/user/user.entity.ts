import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class user {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // 0: client , 1:admin
    @Column({default:0})
    role: number;

    @Column()
    fullname: string;
}
