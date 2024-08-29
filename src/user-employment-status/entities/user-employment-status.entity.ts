import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserEmploymentStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.employmentStatuses, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
