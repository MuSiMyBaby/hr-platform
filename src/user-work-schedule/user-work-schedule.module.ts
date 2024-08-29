import { Module } from '@nestjs/common';
import { UserWorkScheduleService } from './user-work-schedule.service';
import { UserWorkScheduleResolver } from './user-work-schedule.resolver';

@Module({
  providers: [UserWorkScheduleResolver, UserWorkScheduleService],
})
export class UserWorkScheduleModule {}
