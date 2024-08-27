import { Injectable } from '@nestjs/common';
import { CreatePersonalityTraitInput } from './dto/create-personality-trait.input';
import { UpdatePersonalityTraitInput } from './dto/update-personality-trait.input';

@Injectable()
export class PersonalityTraitsService {
  create(createPersonalityTraitInput: CreatePersonalityTraitInput) {
    return 'This action adds a new personalityTrait';
  }

  findAll() {
    return `This action returns all personalityTraits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personalityTrait`;
  }

  update(id: number, updatePersonalityTraitInput: UpdatePersonalityTraitInput) {
    return `This action updates a #${id} personalityTrait`;
  }

  remove(id: number) {
    return `This action removes a #${id} personalityTrait`;
  }
}
