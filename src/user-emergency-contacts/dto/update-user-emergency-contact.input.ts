import { CreateUserEmergencyContactInput } from './create-user-emergency-contact.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserEmergencyContactInput extends PartialType(CreateUserEmergencyContactInput) {
  id: number;
}
