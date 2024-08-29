import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserPersonalStatement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  statement: string;

  @ManyToOne(() => User, (user) => user.personalStatements, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
