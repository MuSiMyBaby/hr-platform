import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UserLanguage } from '@user-language/entities/user-language.entity';
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
import { Role } from '@roles/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true })
  identityNumber: string;

  @Column({ nullable: true, unique: true })
  workPermit: string;

  @Column({ nullable: true, unique: true })
  passport: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  englishName: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: false })
  skipRegistration: boolean;

  @Column()
  password: string;

  @Column({ nullable: true })
  verificationCode: string;

  @Column({ nullable: true })
  googleLogin: boolean;

  @Column({ nullable: true })
  facebookLogin: boolean;

  @Column({ nullable: true })
  instagramLogin: boolean;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ nullable: true })
  lastLoginIp: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => UserLanguage, (userLanguage) => userLanguage.user)
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
  role: Role;
}
