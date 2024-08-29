import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserJobType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobTypeName: string;

  @ManyToOne(() => User, (user) => user.jobTypes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
