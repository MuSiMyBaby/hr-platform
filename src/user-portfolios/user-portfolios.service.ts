import { Injectable } from '@nestjs/common';
import { CreateUserPortfolioInput } from './dto/create-user-portfolio.input';
import { UpdateUserPortfolioInput } from './dto/update-user-portfolio.input';

@Injectable()
export class UserPortfoliosService {
  create(createUserPortfolioInput: CreateUserPortfolioInput) {
    return 'This action adds a new userPortfolio';
  }

  findAll() {
    return `This action returns all userPortfolios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPortfolio`;
  }

  update(id: number, updateUserPortfolioInput: UpdateUserPortfolioInput) {
    return `This action updates a #${id} userPortfolio`;
  }

  remove(id: number) {
    return `This action removes a #${id} userPortfolio`;
  }
}
