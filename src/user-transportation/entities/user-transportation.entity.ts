import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserTransportation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transportationMethod: string;

  @ManyToOne(() => User, (user) => user.transportation, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
