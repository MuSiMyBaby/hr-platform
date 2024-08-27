import { CreateEmergencyContactInput } from './create-emergency-contact.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEmergencyContactInput extends PartialType(CreateEmergencyContactInput) {
  id: number;
}
