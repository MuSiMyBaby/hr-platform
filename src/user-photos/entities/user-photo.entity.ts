import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserPhoto {
  @PrimaryGeneratedColumn()
  id: number;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column({ type: 'text' })
  photo: string;

  /*   @ManyToOne(() => User, (user) => user.photos, {
    cascade: true,
    onDelete: 'CASCADE',
  }) */
  user: User;
}
