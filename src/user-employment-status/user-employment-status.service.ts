import { Injectable } from '@nestjs/common';
import { CreateUserEmploymentStatusInput } from './dto/create-user-employment-status.input';
import { UpdateUserEmploymentStatusInput } from './dto/update-user-employment-status.input';

@Injectable()
export class UserEmploymentStatusService {
  create(createUserEmploymentStatusInput: CreateUserEmploymentStatusInput) {
    return 'This action adds a new userEmploymentStatus';
  }

  findAll() {
    return `This action returns all userEmploymentStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userEmploymentStatus`;
  }

  update(id: number, updateUserEmploymentStatusInput: UpdateUserEmploymentStatusInput) {
    return `This action updates a #${id} userEmploymentStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} userEmploymentStatus`;
  }
}
