import { Module } from '@nestjs/common';
import { UserEmploymentStatusService } from './user-employment-status.service';
import { UserEmploymentStatusResolver } from './user-employment-status.resolver';

@Module({
  providers: [UserEmploymentStatusResolver, UserEmploymentStatusService],
})
export class UserEmploymentStatusModule {}
