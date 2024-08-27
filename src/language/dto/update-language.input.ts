import { CreateLanguageInput } from './create-language.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateLanguageInput extends PartialType(CreateLanguageInput) {
  id: number;
}
