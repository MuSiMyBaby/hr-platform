import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserSkill {
  @PrimaryGeneratedColumn()
  id: number;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column()
  skillName: string;

  /*   @ManyToOne(() => User, (user) => user.skills, {
    cascade: true,
    onDelete: 'CASCADE',
  }) */
  user: User;
}
