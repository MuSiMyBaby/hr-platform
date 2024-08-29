import { Injectable } from '@nestjs/common';
import { CreateUserWorkScheduleInput } from './dto/create-user-work-schedule.input';
import { UpdateUserWorkScheduleInput } from './dto/update-user-work-schedule.input';

@Injectable()
export class UserWorkScheduleService {
  create(createUserWorkScheduleInput: CreateUserWorkScheduleInput) {
    return 'This action adds a new userWorkSchedule';
  }

  findAll() {
    return `This action returns all userWorkSchedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userWorkSchedule`;
  }

  update(id: number, updateUserWorkScheduleInput: UpdateUserWorkScheduleInput) {
    return `This action updates a #${id} userWorkSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} userWorkSchedule`;
  }
}
