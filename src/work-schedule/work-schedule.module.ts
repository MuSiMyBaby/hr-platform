import { Module } from '@nestjs/common';
import { WorkScheduleService } from './work-schedule.service';
import { WorkScheduleResolver } from './work-schedule.resolver';

@Module({
  providers: [WorkScheduleResolver, WorkScheduleService],
})
export class WorkScheduleModule {}
