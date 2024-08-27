import { Injectable } from '@nestjs/common';
import { CreatePortfolioInput } from './dto/create-portfolio.input';
import { UpdatePortfolioInput } from './dto/update-portfolio.input';

@Injectable()
export class PortfoliosService {
  create(createPortfolioInput: CreatePortfolioInput) {
    return 'This action adds a new portfolio';
  }

  findAll() {
    return `This action returns all portfolios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} portfolio`;
  }

  update(id: number, updatePortfolioInput: UpdatePortfolioInput) {
    return `This action updates a #${id} portfolio`;
  }

  remove(id: number) {
    return `This action removes a #${id} portfolio`;
  }
}
