import { Injectable } from '@nestjs/common';
import { CreateTransportationInput } from './dto/create-transportation.input';
import { UpdateTransportationInput } from './dto/update-transportation.input';

@Injectable()
export class TransportationService {
  create(createTransportationInput: CreateTransportationInput) {
    return 'This action adds a new transportation';
  }

  findAll() {
    return `This action returns all transportation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transportation`;
  }

  update(id: number, updateTransportationInput: UpdateTransportationInput) {
    return `This action updates a #${id} transportation`;
  }

  remove(id: number) {
    return `This action removes a #${id} transportation`;
  }
}
