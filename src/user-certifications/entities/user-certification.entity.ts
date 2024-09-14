import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserCertification {
  @PrimaryGeneratedColumn()
  id: number;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column()
  certificationName: string;

  @Column({ type: 'date', nullable: true })
  expirationDate: Date;

  /*   @ManyToOne(() => User, (user) => user.certifications, {
    cascade: true,
    onDelete: 'CASCADE',
  }) */
  user: User;
}
