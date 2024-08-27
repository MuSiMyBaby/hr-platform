import { CreateSkillInput } from './create-skill.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSkillInput extends PartialType(CreateSkillInput) {
  id: number;
}
