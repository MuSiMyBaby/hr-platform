import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UsersConfig } from './_config/typeorm.config';
import { User } from '@users/entities/users.entity';
/* import { Role } from '@roles/entities/role.entity';
import { UserEducation } from '@user-education/entities/user-education.entity';
import { UserLanguage } from '@user-language/entities/user-language.entity';
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
import { UserPhoto } from '@user-photos/entities/user-photo.entity'; */

// 導入模塊
import { UsersModule } from '@users/users.module';
/* import { RolesModule } from '@roles/roles.module';
import { UserEducationModule } from '@user-education/user-education.module';
import { UserLanguageModule } from '@user-language/user-language.module';
import { UserWorkModule } from '@user-work/user-work.module';
import { UserSkillsModule } from '@user-skills/user-skills.module';
import { UserCertificationsModule } from '@user-certifications/user-certifications.module';
import { UserPersonalityTraitsModule } from '@user-personality-traits/user-personality-traits.module';
import { UserTransportationModule } from '@user-transportation/user-transportation.module';
import { UserWorkScheduleModule } from '@user-work-schedule/user-work-schedule.module';
import { UserEmploymentStatusModule } from '@user-employment-status/user-employment-status.module';
import { UserJobTypeModule } from '@user-job-type/user-job-type.module';
import { UserEmergencyContactsModule } from '@user-emergency-contacts/user-emergency-contacts.module';
import { UserPersonalStatementsModule } from '@user-personal-statements/user-personal-statements.module';
import { UserPortfoliosModule } from '@user-portfolios/user-portfolios.module';
import { UserPhotosModule } from '@user-photos/user-photos.module'; */

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env variables globally
    TypeOrmModule.forRootAsync({
      //.env file, so it's Asynchronous
      imports: [ConfigModule],
      inject: [ConfigService], // from ConfigModule
      useFactory: (configService: ConfigService) => UsersConfig(configService),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // 自動生成 GraphQL schema
    }),
    UsersModule,
    /*   RolesModule,
    //ResumesModule,
    UserEducationModule,
    UserLanguageModule,
    UserWorkModule,
    UserSkillsModule,
    UserCertificationsModule,
    UserPersonalityTraitsModule,
    UserTransportationModule,
    UserWorkScheduleModule,
    UserEmploymentStatusModule,
    UserJobTypeModule,
    UserEmergencyContactsModule,
    UserPersonalStatementsModule,
    UserPortfoliosModule,
    UserPhotosModule, */
  ],
})
export class AppModule {
  constructor() {
    console.log('Current database', process.env.NODE_ENV);
  }
}

/*      Role,
        Resume,
        UserEducation,
        UserLanguage,
        UserWork,
        UserSkill,
        UserCertification,
        UserPersonalityTrait,
        UserTransportation,
        UserWorkSchedule,
        UserEmploymentStatus,
        UserJobType,
        UserEmergencyContact,
        UserPersonalStatement,
        UserPortfolio,
        UserPhoto,
*/
