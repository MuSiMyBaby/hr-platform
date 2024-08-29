import { CreateUserWorkScheduleInput } from './create-user-work-schedule.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserWorkScheduleInput extends PartialType(CreateUserWorkScheduleInput) {
  id: number;
}
