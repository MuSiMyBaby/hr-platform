import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { User } from './users/user.entity';
import { Resume } from './resumes/resume.entity';
import { UsersModule } from './users/users.module';
import { ResumesModule } from './resumes/resumes.module';
import { EducationModule } from './education/education.module';
import { LanguageModule } from './language/language.module';
import { WorkModule } from './work/work.module';
import { SkillsModule } from './skills/skills.module';
import { CertificationsModule } from './certifications/certifications.module';
import { PersonalityTraitsModule } from './personality-traits/personality-traits.module';
import { TransportationModule } from './transportation/transportation.module';
import { WorkScheduleModule } from './work-schedule/work-schedule.module';
import { EmploymentStatusModule } from './employment-status/employment-status.module';
import { JobTypeModule } from './job-type/job-type.module';
import { EmergencyContactsModule } from './emergency-contacts/emergency-contacts.module';
import { PersonalStatementsModule } from './personal-statements/personal-statements.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 2020,
      username: 'postgres',
      password: 'revenge3738',
      database: 'hr_platform',
      entities: [User, Resume],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UsersModule,
    ResumesModule,
    EducationModule,
    LanguageModule,
    WorkModule,
    SkillsModule,
    CertificationsModule,
    PersonalityTraitsModule,
    TransportationModule,
    WorkScheduleModule,
    EmploymentStatusModule,
    JobTypeModule,
    EmergencyContactsModule,
    PersonalStatementsModule,
    PortfoliosModule,
    PhotosModule,
  ],
})
export class AppModule {}
