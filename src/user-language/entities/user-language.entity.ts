import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language: string;

  @Column({ nullable: true })
  proficiencyLevel: string;

  @ManyToOne(() => User, (user) => user.languages, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
