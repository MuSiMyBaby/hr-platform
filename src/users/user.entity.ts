import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number; // 主鍵，自動生成的唯一ID

  @Column({ nullable: true, unique: true })
  identityNumber: string; // 身分證字號，唯一

  @Column({ nullable: true, unique: true })
  workPermit: string; // 工作許可證，允許為空但必須唯一

  @Column({ nullable: true, unique: true })
  passport: string; // 護照號碼，允許為空但必須唯一

  @Column({ unique: true })
  email: string; // 電子信箱，唯一

  @Column({ unique: true })
  phoneNumber: string; // 手機號碼，唯一

  @Column({ nullable: true })
  profilePicture: string; // 大頭照的URL或路徑，允許為空

  @Column()
  firstName: string; // 姓

  @Column()
  lastName: string; // 名字

  @Column({ nullable: true })
  englishName: string; // 英文名字，允許為空

  @Column({ nullable: true })
  nickname: string; // 綽號，允許為空

  @Column({ nullable: true })
  address: string; // 通訊地址，允許為空

  @Column({ default: false })
  skipRegistration: boolean; // 跳過註冊，預設為false

  @Column()
  password: string; // 密碼，記得加密

  @Column({ nullable: true })
  verificationCode: string; // 驗證碼，允許為空

  @Column({ nullable: true })
  googleLogin: boolean; // Google 登入狀態，允許為空

  @Column({ nullable: true })
  facebookLogin: boolean; // Facebook 登入狀態，允許為空

  @Column({ nullable: true })
  instagramLogin: boolean; // Instagram 登入狀態，允許為空

  @Column({ nullable: true })
  lastLogin: Date; // 最後登入時間，允許為空

  @Column({ nullable: true })
  lastLoginIp: string; // 最後登入的IP地址，允許為空

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // 記錄創建時間

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date; // 記錄最近更新時間
}
