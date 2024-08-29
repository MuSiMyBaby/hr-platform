import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserWork {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  organization: string;

  @Column()
  jobTitle: string;

  @Column({ type: 'date', nullable: true })
  workPeriodStart: Date;

  @Column({ type: 'date', nullable: true })
  workPeriodEnd: Date;

  @Column({ type: 'text', nullable: true })
  jobDescription: string;

  @ManyToOne(() => User, (user) => user.works, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
