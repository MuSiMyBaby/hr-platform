import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  skillName: string;

  @ManyToOne(() => User, (user) => user.skills, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
