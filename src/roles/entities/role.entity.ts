import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '@users/entities/users.entity'; // 確保這個導入路徑正確

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  /*   @OneToMany(() => User, (user) => user.role)
  users: User[]; */
}
