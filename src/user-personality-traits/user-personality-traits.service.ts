import { Injectable } from '@nestjs/common';
import { CreateUserPersonalityTraitInput } from './dto/create-user-personality-trait.input';
import { UpdateUserPersonalityTraitInput } from './dto/update-user-personality-trait.input';

@Injectable()
export class UserPersonalityTraitsService {
  create(createUserPersonalityTraitInput: CreateUserPersonalityTraitInput) {
    return 'This action adds a new userPersonalityTrait';
  }

  findAll() {
    return `This action returns all userPersonalityTraits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPersonalityTrait`;
  }

  update(id: number, updateUserPersonalityTraitInput: UpdateUserPersonalityTraitInput) {
    return `This action updates a #${id} userPersonalityTrait`;
  }

  remove(id: number) {
    return `This action removes a #${id} userPersonalityTrait`;
  }
}
