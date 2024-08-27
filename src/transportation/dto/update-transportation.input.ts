import { CreateTransportationInput } from './create-transportation.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTransportationInput extends PartialType(CreateTransportationInput) {
  id: number;
}
