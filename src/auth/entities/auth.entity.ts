import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    username: string;

    @Column()
    password: string;
    }
