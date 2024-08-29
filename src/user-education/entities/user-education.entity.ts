import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserEducation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  school: string;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  status: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @ManyToOne(() => User, (user) => user.educations, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
