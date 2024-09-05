import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@users/entities/users.entity';

@Entity()
export class UserTransportation {
  @PrimaryGeneratedColumn()
  id: number; // 主鍵，唯一標識

  @Column()
  transportationMethod: string; // 交通工具的種類

  @ManyToOne(() => User, (user) => user.transportation, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User; // 這裡的 user 是外鍵，關聯到 User 表
}
