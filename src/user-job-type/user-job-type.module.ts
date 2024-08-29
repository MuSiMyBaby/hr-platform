import { Module } from '@nestjs/common';
import { UserJobTypeService } from './user-job-type.service';
import { UserJobTypeResolver } from './user-job-type.resolver';

@Module({
  providers: [UserJobTypeResolver, UserJobTypeService],
})
export class UserJobTypeModule {}
