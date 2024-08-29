import { CreateUserPersonalStatementInput } from './create-user-personal-statement.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserPersonalStatementInput extends PartialType(CreateUserPersonalStatementInput) {
  id: number;
}
