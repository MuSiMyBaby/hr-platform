import { Injectable } from '@nestjs/common';
import { CreateUserWorkInput } from './dto/create-user-work.input';
import { UpdateUserWorkInput } from './dto/update-user-work.input';

@Injectable()
export class UserWorkService {
  create(createUserWorkInput: CreateUserWorkInput) {
    return 'This action adds a new userWork';
  }

  findAll() {
    return `This action returns all userWork`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userWork`;
  }

  update(id: number, updateUserWorkInput: UpdateUserWorkInput) {
    return `This action updates a #${id} userWork`;
  }

  remove(id: number) {
    return `This action removes a #${id} userWork`;
  }
}
