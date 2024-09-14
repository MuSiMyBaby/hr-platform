import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserPersonalStatement {
  @PrimaryGeneratedColumn()
  id: number;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column({ type: 'text' })
  statement: string;

  /*   @ManyToOne(() => User, (user) => user.personalStatements, {
    cascade: true,
    onDelete: 'CASCADE',
  }) */
  user: User;
}
