import { CreateUserSkillInput } from './create-user-skill.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserSkillInput extends PartialType(CreateUserSkillInput) {
  id: number;
}
