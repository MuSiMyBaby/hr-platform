/**
 * User Entity Overview:
 *
 * 1. **id** - User's unique identifier (UUID).
 * 2. **identityNumber, workPermit, passport** - Unique identification numbers (identity, work permit, passport).
 * 3. **email, phoneNumber** - User's email and phone number, both unique.
 * 4. **emailVerified, phoneVerified** - Flags indicating whether the user's email or phone is verified.
 * 5. **profilePicture** - URL to the user's profile picture.
 * 6. **firstName, lastName, englishName, nickname** - Personal information including first name, last name, optional English name, and nickname.
 * 7. **mailCountry, mailCity, mailDistrict, mailAddress** - Mailing address (country, city, district, full address).
 * 8. **residentialCountry, residentialCity, residentialDistrict, residentialAddress** - Residential address details (country, city, district, full address).
 * 9. **isBasicInfoComplete** - Indicates if basic information is complete (used in registration process).
 * 10. **isSecurityQuestionsComplete** - Indicates if the security questions setup is complete.
 * 11. **registrationStep** - Step of the registration process (1: Basic info incomplete, 2: Security questions incomplete, 3: Registration complete).
 * 12. **skipRegistration** - A flag for skipping certain registration steps.
 * 13. **password** - User's encrypted password.
 * 14. **lastPasswordReset** - Timestamp of the last password reset.
 * 15. **verificationCode, verificationCodeExpiry** - Verification code for email/phone verification and its expiry timestamp.
 * 16. **resetToken, resetTokenExpiry** - Token for password reset and its expiry timestamp.
 * 17. **isRegistered** - Indicates whether the user has completed the registration process.
 * 18. **googleAppLogin, facebookAppLogin, instagramAppLogin, lineAppLogin** - Flags for third-party logins (Google, Facebook, Instagram, Line).
 * 19. **lastLogin** - Timestamp of the user's last login.
 * 20. **createdAt, updatedAt** - Timestamps for when the user record was created and last updated.
 * 21. **deletedAt** - Soft delete timestamp.
 * 22. **securityQuestion1, securityQuestion2, securityQuestion3** - IDs for the three security questions selected by the user.
 * 23. **securityAnswer1, securityAnswer2, securityAnswer3** - Hashed answers to the security questions.
 * 24. **verificationSentCount, lastVerificationSentDate** - Number of verification code send attempts and the timestamp of the last send.
 * 25. **failedLoginAttempts** - Number of failed login attempts before locking the account.
 * 26. **failedSecurityAnswerAttempts** - Number of failed attempts to answer security questions.
 * 27. **accountLocked** - Indicates whether the account is locked due to multiple failed login attempts.
 * 28. **securityAnswerLocked** - Indicates whether the security answer process is locked due to multiple failed attempts.
 * 29. **failedPasswordResetAttempts** - Number of failed password reset attempts.
 * 30. **passwordResetLocked** - Indicates whether the password reset process is locked.
 * 31. **lastSecurityAnswerAttempt** - Timestamp of the last security answer attempt.
 * 32. **lastPasswordResetAttempt** - Timestamp of the last password reset attempt.
 */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType() // 將這個實體暴露為 GraphQL 的物件-> @Mutation(=>Users)接收
@Entity()
export class User {
  @Index()
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

  @Index()
  @Field() // 信箱
  @Column({ unique: true })
  email: string;

  @Field({ defaultValue: false }) // 信箱驗證
  @Column({ default: false })
  emailVerified: boolean;

  @Index()
  @Field() // 手機號碼
  @Column({ unique: true })
  phoneNumber: string;

  @Field({ defaultValue: false }) // 手機驗證
  @Column({ default: false })
  phoneVerified: boolean;

  @Index()
  @Field({ nullable: true }) //大頭照
  @Column({ type: 'text', nullable: true })
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

  @Field({ defaultValue: false })
  @Column({ default: false })
  isBasicInfoComplete: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  isSecurityQuestionsComplete: boolean;

  @Field({ defaultValue: 1 })
  @Column({ default: 1 })
  registrationStep: number;

  @Field({ defaultValue: false }) // 略過註冊流程標誌
  @Column({ default: false })
  skipRegistration: boolean;

  @Field() // 密碼
  @Column()
  password: string;

  @Field({ nullable: true }) // 最後一次重設密碼時間
  @Column({ type: 'timestamp', nullable: true })
  lastPasswordReset: Date;

  @Field({ nullable: true }) // 驗證碼
  @Column({ nullable: true })
  verificationCode: string;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  verificationCodeExpiry: Date; // 驗證碼過期時間
  @Index()
  @Field({ nullable: true })
  @Column({ nullable: true })
  resetToken: string;
  @Index()
  @Field({ nullable: true })
  @Column({ nullable: true })
  resetTokenExpiry: Date;
  @Index()
  @Field({ defaultValue: false }) // 是否完成註冊流程
  @Column({ default: false })
  isRegistered: boolean;
  @Index()
  @Field({ defaultValue: false }) // Google 登入
  @Column({ default: false })
  googleAppLogin: boolean;
  @Index()
  @Field({ defaultValue: false }) // Facebook 登入
  @Column({ default: false })
  facebookAppLogin: boolean;
  @Index()
  @Field({ defaultValue: false }) // Instagram 登入
  @Column({ default: false })
  instagramAppLogin: boolean;
  @Index()
  @Field({ defaultValue: false }) // Line 登入
  @Column({ default: false })
  lineAppLogin: boolean;

  @Field({ nullable: true }) // 最後登入時間
  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  /*   @Field({ nullable: true }) // 最後登入 IP
  @Column({ nullable: true })
  lastLoginIp: string; */

  @Field() // 創建時間
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field({ nullable: true }) // 註冊完成時間
  @Column({ type: 'timestamp', nullable: true })
  registrationCompletedAt: Date;

  @Field({ defaultValue: 0 }) // 驗證碼驗證失敗次數
  @Column({ default: 0 })
  failedVerificationCodeAttempts: number;

  @Field({ defaultValue: false }) // 驗證碼鎖定
  @Column({ default: false })
  verificationCodeLocked: boolean;

  @Field() // 更新時間
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Field({ nullable: true }) // 軟刪除標記
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column({ nullable: true })
  securityQuestion1: number; // 儲存第一個安全問題的編號

  @Column({ nullable: true })
  securityQuestion2: number;

  @Column({ nullable: true })
  securityQuestion3: number;

  @Field() // 安全回答1
  @Column()
  securityAnswer1: string;

  @Field() // 安全回答2
  @Column()
  securityAnswer2: string;

  @Field() // 安全回答3
  @Column()
  securityAnswer3: string;

  @Field({ defaultValue: 0 }) // 寄送次數
  @Column({ default: 0 })
  verificationSentCount: number;

  @Field({ nullable: true }) // 最後一次寄送時間
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  lastVerificationSentDate: Date;

  @Field({ defaultValue: 0 }) // 登入失敗次數
  @Column({ default: 0 })
  failedLoginAttempts: number;

  @Field({ defaultValue: 0 }) // 安全回答失敗次數
  @Column({ default: 0 })
  failedSecurityAnswerAttempts: number;

  @Field({ defaultValue: false }) // 帳號鎖定
  @Column({ default: false })
  accountLocked: boolean;

  @Field({ defaultValue: false }) // 安全回答鎖定
  @Column({ default: false })
  securityAnswerLocked: boolean;

  @Field({ defaultValue: 0 }) // 密碼重設失敗次數
  @Column({ default: 0 })
  failedPasswordResetAttempts: number;

  @Field({ defaultValue: false }) // 密碼重設鎖定
  @Column({ default: false })
  passwordResetLocked: boolean;

  @Field({ nullable: true }) //安全回答的最後嘗試時間
  @Column({ type: 'timestamp', nullable: true })
  lastSecurityAnswerAttempt: Date;

  @Field({ nullable: true }) //最後密碼修改嘗試時間
  @Column({ type: 'timestamp', nullable: true })
  lastPasswordResetAttempt: Date;

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
