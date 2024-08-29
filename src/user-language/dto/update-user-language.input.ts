import { CreateUserLanguageInput } from './create-user-language.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserLanguageInput extends PartialType(CreateUserLanguageInput) {
  id: number;
}
