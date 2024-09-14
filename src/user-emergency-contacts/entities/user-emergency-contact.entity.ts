import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserEmergencyContact {
  @PrimaryGeneratedColumn()
  id: number;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  relationship: string;

  /*   @ManyToOne(() => User, (user) => user.emergencyContacts, {
    cascade: true,
    onDelete: 'CASCADE',
  }) */
  user: User;
}
