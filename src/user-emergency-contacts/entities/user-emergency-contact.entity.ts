import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserEmergencyContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  relationship: string;

  @ManyToOne(() => User, (user) => user.emergencyContacts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
