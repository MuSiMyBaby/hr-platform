import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserPortfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  portfolio: string;

  @ManyToOne(() => User, (user) => user.portfolios, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
