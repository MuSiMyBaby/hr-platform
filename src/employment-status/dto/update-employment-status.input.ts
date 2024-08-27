import { CreateEmploymentStatusInput } from './create-employment-status.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEmploymentStatusInput extends PartialType(CreateEmploymentStatusInput) {
  id: number;
}
