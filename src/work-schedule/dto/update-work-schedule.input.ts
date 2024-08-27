import { CreateWorkScheduleInput } from './create-work-schedule.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateWorkScheduleInput extends PartialType(CreateWorkScheduleInput) {
  id: number;
}
