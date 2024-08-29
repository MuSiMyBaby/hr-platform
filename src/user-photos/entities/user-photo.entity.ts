import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  photo: string;

  @ManyToOne(() => User, (user) => user.photos, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
