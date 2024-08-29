import { Injectable } from '@nestjs/common';
import { CreateUserEducationInput } from './dto/create-user-education.input';
import { UpdateUserEducationInput } from './dto/update-user-education.input';

@Injectable()
export class UserEducationService {
  create(createUserEducationInput: CreateUserEducationInput) {
    return 'This action adds a new userEducation';
  }

  findAll() {
    return `This action returns all userEducation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userEducation`;
  }

  update(id: number, updateUserEducationInput: UpdateUserEducationInput) {
    return `This action updates a #${id} userEducation`;
  }

  remove(id: number) {
    return `This action removes a #${id} userEducation`;
  }
}
