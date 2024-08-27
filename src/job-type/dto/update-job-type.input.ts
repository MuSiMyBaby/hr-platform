import { CreateJobTypeInput } from './create-job-type.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateJobTypeInput extends PartialType(CreateJobTypeInput) {
  id: number;
}
