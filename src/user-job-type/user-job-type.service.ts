import { Injectable } from '@nestjs/common';
import { CreateUserJobTypeInput } from './dto/create-user-job-type.input';
import { UpdateUserJobTypeInput } from './dto/update-user-job-type.input';

@Injectable()
export class UserJobTypeService {
  create(createUserJobTypeInput: CreateUserJobTypeInput) {
    return 'This action adds a new userJobType';
  }

  findAll() {
    return `This action returns all userJobType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userJobType`;
  }

  update(id: number, updateUserJobTypeInput: UpdateUserJobTypeInput) {
    return `This action updates a #${id} userJobType`;
  }

  remove(id: number) {
    return `This action removes a #${id} userJobType`;
  }
}
