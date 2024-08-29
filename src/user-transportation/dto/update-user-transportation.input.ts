import { CreateUserTransportationInput } from './create-user-transportation.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserTransportationInput extends PartialType(
  CreateUserTransportationInput,
) {
  id: number;
}
