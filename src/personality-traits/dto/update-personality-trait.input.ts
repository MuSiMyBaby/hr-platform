import { CreatePersonalityTraitInput } from './create-personality-trait.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePersonalityTraitInput extends PartialType(CreatePersonalityTraitInput) {
  id: number;
}
