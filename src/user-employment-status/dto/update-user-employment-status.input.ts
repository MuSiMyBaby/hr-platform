import { CreateUserEmploymentStatusInput } from './create-user-employment-status.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserEmploymentStatusInput extends PartialType(CreateUserEmploymentStatusInput) {
  id: number;
}
