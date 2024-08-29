import { Injectable } from '@nestjs/common';
import { CreateUserLanguageInput } from './dto/create-user-language.input';
import { UpdateUserLanguageInput } from './dto/update-user-language.input';

@Injectable()
export class UserLanguageService {
  create(createUserLanguageInput: CreateUserLanguageInput) {
    return 'This action adds a new userLanguage';
  }

  findAll() {
    return `This action returns all userLanguage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userLanguage`;
  }

  update(id: number, updateUserLanguageInput: UpdateUserLanguageInput) {
    return `This action updates a #${id} userLanguage`;
  }

  remove(id: number) {
    return `This action removes a #${id} userLanguage`;
  }
}
