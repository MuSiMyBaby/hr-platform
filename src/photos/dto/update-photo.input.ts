import { CreatePhotoInput } from './create-photo.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePhotoInput extends PartialType(CreatePhotoInput) {
  id: number;
}
