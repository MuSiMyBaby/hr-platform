import { CreateUserPersonalityTraitInput } from './create-user-personality-trait.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserPersonalityTraitInput extends PartialType(CreateUserPersonalityTraitInput) {
  id: number;
}
