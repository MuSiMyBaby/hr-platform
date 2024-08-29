import { CreateUserEducationInput } from './create-user-education.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserEducationInput extends PartialType(CreateUserEducationInput) {
  id: number;
}
