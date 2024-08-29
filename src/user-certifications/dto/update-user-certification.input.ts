import { CreateUserCertificationInput } from './create-user-certification.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserCertificationInput extends PartialType(CreateUserCertificationInput) {
  id: number;
}
