import { CreatePersonalStatementInput } from './create-personal-statement.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePersonalStatementInput extends PartialType(CreatePersonalStatementInput) {
  id: number;
}
