import { Injectable } from '@nestjs/common';
import { CreateUserIpInput } from './dto/create-user-ip.input';
import { UpdateUserIpInput } from './dto/update-user-ip.input';

@Injectable()
export class UserIpService {
  create(createUserIpInput: CreateUserIpInput) {
    return 'This action adds a new userIp';
  }

  findAll() {
    return `This action returns all userIp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userIp`;
  }

  update(id: number, updateUserIpInput: UpdateUserIpInput) {
    return `This action updates a #${id} userIp`;
  }

  remove(id: number) {
    return `This action removes a #${id} userIp`;
  }
}
