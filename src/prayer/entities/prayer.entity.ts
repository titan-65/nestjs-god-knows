import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import {User} from '../../users/entities/user.entity';

@Entity()
export class Prayer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => User)
  owner: User;

  // @Column('simple-array')
  // tags: string[];
  //
  // @Column('simple-array')
  //   comments: string[];
}
