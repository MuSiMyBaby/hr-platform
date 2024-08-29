import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserCertification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  certificationName: string;

  @Column({ type: 'date', nullable: true })
  expirationDate: Date;

  @ManyToOne(() => User, (user) => user.certifications, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
