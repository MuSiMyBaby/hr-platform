import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserEmploymentStatus {
  @PrimaryGeneratedColumn()
  id: number;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column()
  status: string;

  /*   @ManyToOne(() => User, (user) => user.employmentStatuses, {
    cascade: true,
    onDelete: 'CASCADE',
  }) */
  user: User;
}
