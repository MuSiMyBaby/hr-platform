import { Module } from '@nestjs/common';
import { EmploymentStatusService } from './employment-status.service';
import { EmploymentStatusResolver } from './employment-status.resolver';

@Module({
  providers: [EmploymentStatusResolver, EmploymentStatusService],
})
export class EmploymentStatusModule {}
