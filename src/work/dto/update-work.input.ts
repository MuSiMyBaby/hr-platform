import { CreateWorkInput } from './create-work.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateWorkInput extends PartialType(CreateWorkInput) {
  id: number;
}
