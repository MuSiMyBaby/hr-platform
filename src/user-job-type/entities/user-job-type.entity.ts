import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserJobType {
  @PrimaryGeneratedColumn()
  id: number;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column()
  jobTypeName: string;

  /*   @ManyToOne(() => User, (user) => user.jobTypes, {
    cascade: true,
    onDelete: 'CASCADE',
  }) */
  user: User;
}
