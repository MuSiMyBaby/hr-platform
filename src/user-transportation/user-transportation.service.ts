import { Injectable } from '@nestjs/common';
import { CreateUserTransportationInput } from './dto/create-user-transportation.input';
import { UpdateUserTransportationInput } from './dto/update-user-transportation.input';

@Injectable()
export class UserTransportationService {
  create(createUserTransportationInput: CreateUserTransportationInput) {
    return 'This action adds a new userTransportation';
  }

  findAll() {
    return `This action returns all userTransportation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userTransportation`;
  }

  update(id: number, updateUserTransportationInput: UpdateUserTransportationInput) {
    return `This action updates a #${id} userTransportation`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTransportation`;
  }
}
