import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserPortfolio {
  @PrimaryGeneratedColumn()
  id: number;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column({ type: 'text' })
  portfolio: string;

  /*   @ManyToOne(() => User, (user) => user.portfolios, {
    cascade: true,
    onDelete: 'CASCADE',
  }) */
  user: User;
}
