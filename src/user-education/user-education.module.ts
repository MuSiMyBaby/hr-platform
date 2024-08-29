import { Module } from '@nestjs/common';
import { UserEducationService } from './user-education.service';
import { UserEducationResolver } from './user-education.resolver';

@Module({
  providers: [UserEducationResolver, UserEducationService],
})
export class UserEducationModule {}
