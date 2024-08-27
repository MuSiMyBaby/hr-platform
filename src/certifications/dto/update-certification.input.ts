import { CreateCertificationInput } from './create-certification.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCertificationInput extends PartialType(CreateCertificationInput) {
  id: number;
}
