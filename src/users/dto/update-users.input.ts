import { CreateUserWorkScheduleInput } from '@user-work-schedule/dto/create-user-work-schedule.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserWorkScheduleInput extends PartialType(
  CreateUserWorkScheduleInput,
) {
  id: number;
}
