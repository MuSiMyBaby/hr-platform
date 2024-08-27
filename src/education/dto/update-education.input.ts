import { CreateEducationInput } from './create-education.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEducationInput extends PartialType(CreateEducationInput) {
  id: number;
}
