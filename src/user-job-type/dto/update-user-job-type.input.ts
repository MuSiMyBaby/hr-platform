import { CreateUserJobTypeInput } from './create-user-job-type.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserJobTypeInput extends PartialType(CreateUserJobTypeInput) {
  id: number;
}
