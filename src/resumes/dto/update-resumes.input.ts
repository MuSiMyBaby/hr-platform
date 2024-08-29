import { UserWorkSchedule } from '@user-work-schedule/entities/user-work-schedule.entity';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserWorkScheduleInput extends PartialType(UserWorkSchedule) {
  id: number;
}
