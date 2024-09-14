import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserPersonalityTrait {
  @PrimaryGeneratedColumn()
  id: number;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column()
  personalTrait: string;

  @Column({ nullable: true })
  interest: string;

  /*   @ManyToOne(() => User, (user) => user.personalityTraits, {
    cascade: true,
    onDelete: 'CASCADE',
  }) */
  user: User;
}
