import { CreateUserPhotoInput } from './create-user-photo.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserPhotoInput extends PartialType(CreateUserPhotoInput) {
  id: number;
}
