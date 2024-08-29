import { CreateUserPortfolioInput } from './create-user-portfolio.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserPortfolioInput extends PartialType(CreateUserPortfolioInput) {
  id: number;
}
