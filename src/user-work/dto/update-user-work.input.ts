import { CreateUserWorkInput } from './create-user-work.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserWorkInput extends PartialType(CreateUserWorkInput) {
  id: number;
}
