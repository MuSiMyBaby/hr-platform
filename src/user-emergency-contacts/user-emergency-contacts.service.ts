import { Injectable } from '@nestjs/common';
import { CreateUserEmergencyContactInput } from './dto/create-user-emergency-contact.input';
import { UpdateUserEmergencyContactInput } from './dto/update-user-emergency-contact.input';

@Injectable()
export class UserEmergencyContactsService {
  create(createUserEmergencyContactInput: CreateUserEmergencyContactInput) {
    return 'This action adds a new userEmergencyContact';
  }

  findAll() {
    return `This action returns all userEmergencyContacts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userEmergencyContact`;
  }

  update(id: number, updateUserEmergencyContactInput: UpdateUserEmergencyContactInput) {
    return `This action updates a #${id} userEmergencyContact`;
  }

  remove(id: number) {
    return `This action removes a #${id} userEmergencyContact`;
  }
}
