import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType() // 將這個實體暴露為 GraphQL 的物件-> @Mutation(=>Users)接收
@Entity()
export class User {
  @Field() // GraphQL 查詢需要返回的欄位
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true }) // 身份證號
  @Column({ nullable: true, unique: true })
  identityNumber: string;

  @Field({ nullable: true }) // 工作許可證
  @Column({ nullable: true, unique: true })
  workPermit: string;

  @Field({ nullable: true }) // 護照號碼
  @Column({ nullable: true, unique: true })
  passport: string;

  @Field() // 信箱
  @Column({ unique: true })
  email: string;

  @Field({ defaultValue: false }) // 信箱驗證
  @Column({ default: false })
  emailVerified: boolean;

  @Field() // 手機號碼
  @Column({ unique: true })
  phoneNumber: string;

  @Field({ defaultValue: false }) // 手機驗證
  @Column({ default: false })
  phoneVerified: boolean;

  @Field({ nullable: true }) // 使用者大頭照
  @Column({ nullable: true })
  profilePicture: string;

  @Field() // 名字
  @Column()
  firstName: string;

  @Field() // 姓氏
  @Column()
  lastName: string;

  @Field({ nullable: true }) // 英文名字
  @Column({ nullable: true })
  englishName: string;

  @Field({ nullable: true }) // 暱稱
  @Column({ nullable: true })
  nickname: string;

  // 拆分地址部分
  @Field({ nullable: true }) // 國家
  @Column({ nullable: true })
  mailCountry: string;

  @Field({ nullable: true }) // 城市
  @Column({ nullable: true })
  mailCity: string;

  @Field({ nullable: true }) // 區域
  @Column({ nullable: true })
  mailDistrict: string;

  @Field({ nullable: true }) // 完整地址
  @Column({ nullable: true })
  mailAddress: string;

  @Field({ nullable: true }) // 國家
  @Column({ nullable: true })
  residentialCountry: string;

  @Field({ nullable: true }) // 城市
  @Column({ nullable: true })
  residentialCity: string;

  @Field({ nullable: true }) // 區域
  @Column({ nullable: true })
  residentialDistrict: string;

  @Field({ nullable: true }) // 完整地址
  @Column({ nullable: true })
  residentialAddress: string;

  @Field({ defaultValue: false }) // 略過註冊流程標誌
  @Column({ default: false })
  skipRegistration: boolean;

  @Field() // 密碼
  @Column()
  password: string;

  @Field({ nullable: true }) // 最後一次重設密碼時間
  @Column({ nullable: true })
  lastPasswordReset: Date;

  @Field({ nullable: true }) // 驗證碼
  @Column({ nullable: true })
  verificationCode: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  resetToken: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  resetTokenExpiry: Date;

  @Field({ nullable: true }) // Google 登入
  @Column({ nullable: true })
  googleLogin: boolean;

  @Field({ defaultValue: false }) // 是否完成註冊流程
  @Column({ default: false })
  isRegistered: boolean;

  @Field({ nullable: true }) // Facebook 登入
  @Column({ nullable: true })
  facebookLogin: boolean;

  @Field({ nullable: true }) // Instagram 登入
  @Column({ nullable: true })
  instagramLogin: boolean;

  @Field({ nullable: true }) // 最後登入時間
  @Column({ nullable: true })
  lastLogin: Date;

  /*   @Field({ nullable: true }) // 最後登入 IP
  @Column({ nullable: true })
  lastLoginIp: string; */

  @Field() // 創建時間
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field() // 更新時間
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Field({ nullable: true }) // 軟刪除標記
  @DeleteDateColumn({ nullable: true })
  deleteAt: Date;

  @Field() // 安全回答1
  @Column()
  securityAnswer1: string;

  @Field() // 安全回答2
  @Column()
  securityAnswer2: string;

  @Field() // 安全回答3
  @Column()
  securityAnswer3: string;

  @Field({ defaultValue: 0 }) // 登入失敗次數
  @Column({ default: 0 })
  failedLoginAttempts: number;

  @Field({ defaultValue: false }) // 帳號鎖定
  @Column({ default: false })
  accountLocked: boolean;

  /*  @OneToMany(() => UserLanguage, (userLanguage) => userLanguage.user)
  languages: UserLanguage[];

  @OneToMany(() => UserEducation, (userEducation) => userEducation.user)
  educations: UserEducation[];

  @OneToMany(() => UserWork, (userWork) => userWork.user)
  works: UserWork[];

  @OneToMany(() => UserSkill, (userSkill) => userSkill.user)
  skills: UserSkill[];

  @OneToMany(() => UserCertification, (userCertification) => userCertification.user)
  certifications: UserCertification[];

  @OneToMany(() => UserPersonalityTrait, (userPersonalityTrait) => userPersonalityTrait.user)
  personalityTraits: UserPersonalityTrait[];

  @OneToMany(() => UserTransportation, (userTransportation) => userTransportation.user)
  transportation: UserTransportation[];

  @OneToMany(() => UserWorkSchedule, (userWorkSchedule) => userWorkSchedule.user)
  workSchedules: UserWorkSchedule[];

  @OneToMany(() => UserEmploymentStatus, (userEmploymentStatus) => userEmploymentStatus.user)
  employmentStatuses: UserEmploymentStatus[];

  @OneToMany(() => UserJobType, (userJobType) => userJobType.user)
  jobTypes: UserJobType[];

  @OneToMany(() => UserEmergencyContact, (userEmergencyContact) => userEmergencyContact.user)
  emergencyContacts: UserEmergencyContact[];

  @OneToMany(() => UserPersonalStatement, (userPersonalStatement) => userPersonalStatement.user)
  personalStatements: UserPersonalStatement[];

  @OneToMany(() => UserPortfolio, (userPortfolio) => userPortfolio.user)
  portfolios: UserPortfolio[];

  @OneToMany(() => UserPhoto, (userPhoto) => userPhoto.user)
  photos: UserPhoto[];
   
    // 不再單獨存儲最後的登入 IP，改為建立與 user-ip 的 OneToMany 關係
  @OneToMany(() => UserIp, (userIp) => userIp.user)
  userIps: UserIp[];

  // 不再單獨存儲裝置資訊，改為建立與 user-device 的 OneToMany 關係
  @OneToMany(() => UserDevice, (userDevice) => userDevice.user)
  userDevices: UserDevice[];
  
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
  */
}
