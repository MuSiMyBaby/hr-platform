import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserWorkSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shift: string;

  @Column({ nullable: true })
  preference: string;

  @Column({ type: 'time', nullable: true })
  expectedStartTime: string;

  @Column({ type: 'time', nullable: true })
  expectedEndTime: string;

  @ManyToOne(() => User, (user) => user.workSchedules, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
