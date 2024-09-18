import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
/* import { UserLanguage } from '@user-language/entities/user-language.entity';
import { UserEducation } from '@user-education/entities/user-education.entity';
import { UserWork } from '@user-work/entities/user-work.entity';
import { UserSkill } from '@user-skills/entities/user-skill.entity';
import { UserCertification } from '@user-certifications/entities/user-certification.entity';
import { UserPersonalityTrait } from '@user-personality-traits/entities/user-personality-trait.entity';
import { UserTransportation } from '@user-transportation/entities/user-transportation.entity';
import { UserWorkSchedule } from '@user-work-schedule/entities/user-work-schedule.entity';
import { UserEmploymentStatus } from '@user-employment-status/entities/user-employment-status.entity';
import { UserJobType } from '@user-job-type/entities/user-job-type.entity';
import { UserEmergencyContact } from '@user-emergency-contacts/entities/user-emergency-contact.entity';
import { UserPersonalStatement } from '@user-personal-statements/entities/user-personal-statement.entity';
import { UserPortfolio } from '@user-portfolios/entities/user-portfolio.entity';
import { UserPhoto } from '@user-photos/entities/user-photo.entity';
import { Role } from '@roles/entities/role.entity'; */

@ObjectType() // 將這個實體暴露為 GraphQL 的物件-> @Mutation(=>Users)接收
@Entity()
export class User {
  @Field() // GraphQL 查詢需要返回的欄位
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true }) // GraphQL 查詢時此欄位可選
  @Column({ nullable: true, unique: true })
  identityNumber: string;

  @Field({ nullable: true })
  @Column({ nullable: true, unique: true })
  workPermit: string;

  @Field({ nullable: true })
  @Column({ nullable: true, unique: true })
  passport: string;

  @Field() // GraphQL 需要返回 email
  @Column({ unique: true })
  email: string;

  @Field() // GraphQL 需要返回 phoneNumber
  @Column({ unique: true })
  phoneNumber: string;

  @Field({ nullable: true }) // 可選欄位
  @Column({ nullable: true })
  profilePicture: string;

  @Field() // GraphQL 需要返回 firstName
  @Column()
  firstName: string;

  @Field() // GraphQL 需要返回 lastName
  @Column()
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  englishName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nickname: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address: string;

  @Field({ defaultValue: false }) // GraphQL 默認值
  @Column({ default: false })
  skipRegistration: boolean;

  @Field() // 密碼一般不應公開查詢
  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  verificationCode: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  googleLogin: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  facebookLogin: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  instagramLogin: boolean;

  @Field({ nullable: true }) // GraphQL 可以返回上次登錄時間
  @Column({ nullable: true })
  lastLogin: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastLoginIp: string;

  @Field() // 必須返回 createdAt 時間戳
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field() // 必須返回 updatedAt 時間戳
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Field({ nullable: true }) // 可選的刪除時間
  @DeleteDateColumn({ nullable: true }) // 啟用軟刪除
  deleteAt: Date;

  @Field()
  @Column()
  securityAnswer1: string;

  @Field()
  @Column()
  securityAnswer2: string;

  @Field()
  @Column()
  securityAnswer3: string;

  /*  @OneToMany(() => UserLanguage, (userLanguage) => userLanguage.user)
  languages: UserLanguage[];

  @OneToMany(() => UserEducation, (userEducation) => userEducation.user)
  educations: UserEducation[];

  @OneToMany(() => UserWork, (userWork) => userWork.user)
  works: UserWork[];

  @OneToMany(() => UserSkill, (userSkill) => userSkill.user)
  skills: UserSkill[];

  @OneToMany(
    () => UserCertification,
    (userCertification) => userCertification.user,
  )
  certifications: UserCertification[];

  @OneToMany(
    () => UserPersonalityTrait,
    (userPersonalityTrait) => userPersonalityTrait.user,
  )
  personalityTraits: UserPersonalityTrait[];

  @OneToMany(
    () => UserTransportation,
    (userTransportation) => userTransportation.user,
  )
  transportation: UserTransportation[];

  @OneToMany(
    () => UserWorkSchedule,
    (userWorkSchedule) => userWorkSchedule.user,
  )
  workSchedules: UserWorkSchedule[];

  @OneToMany(
    () => UserEmploymentStatus,
    (userEmploymentStatus) => userEmploymentStatus.user,
  )
  employmentStatuses: UserEmploymentStatus[];

  @OneToMany(() => UserJobType, (userJobType) => userJobType.user)
  jobTypes: UserJobType[];

  @OneToMany(
    () => UserEmergencyContact,
    (userEmergencyContact) => userEmergencyContact.user,
  )
  emergencyContacts: UserEmergencyContact[];

  @OneToMany(
    () => UserPersonalStatement,
    (userPersonalStatement) => userPersonalStatement.user,
  )
  personalStatements: UserPersonalStatement[];

  @OneToMany(() => UserPortfolio, (userPortfolio) => userPortfolio.user)
  portfolios: UserPortfolio[];

  @OneToMany(() => UserPhoto, (userPhoto) => userPhoto.user)
  photos: UserPhoto[];

  @ManyToOne(() => Role, (role) => role.users)
  role: Role; */
}
