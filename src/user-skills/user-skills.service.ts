import { Injectable } from '@nestjs/common';
import { CreateUserSkillInput } from './dto/create-user-skill.input';
import { UpdateUserSkillInput } from './dto/update-user-skill.input';

@Injectable()
export class UserSkillsService {
  create(createUserSkillInput: CreateUserSkillInput) {
    return 'This action adds a new userSkill';
  }

  findAll() {
    return `This action returns all userSkills`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userSkill`;
  }

  update(id: number, updateUserSkillInput: UpdateUserSkillInput) {
    return `This action updates a #${id} userSkill`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSkill`;
  }
}
