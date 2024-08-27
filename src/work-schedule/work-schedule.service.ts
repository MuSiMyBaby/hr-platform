import { Injectable } from '@nestjs/common';
import { CreateWorkScheduleInput } from './dto/create-work-schedule.input';
import { UpdateWorkScheduleInput } from './dto/update-work-schedule.input';

@Injectable()
export class WorkScheduleService {
  create(createWorkScheduleInput: CreateWorkScheduleInput) {
    return 'This action adds a new workSchedule';
  }

  findAll() {
    return `This action returns all workSchedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workSchedule`;
  }

  update(id: number, updateWorkScheduleInput: UpdateWorkScheduleInput) {
    return `This action updates a #${id} workSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} workSchedule`;
  }
}
