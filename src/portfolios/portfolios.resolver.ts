import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PortfoliosService } from './portfolios.service';
import { CreatePortfolioInput } from './dto/create-portfolio.input';
import { UpdatePortfolioInput } from './dto/update-portfolio.input';

@Resolver('Portfolio')
export class PortfoliosResolver {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Mutation('createPortfolio')
  create(@Args('createPortfolioInput') createPortfolioInput: CreatePortfolioInput) {
    return this.portfoliosService.create(createPortfolioInput);
  }

  @Query('portfolios')
  findAll() {
    return this.portfoliosService.findAll();
  }

  @Query('portfolio')
  findOne(@Args('id') id: number) {
    return this.portfoliosService.findOne(id);
  }

  @Mutation('updatePortfolio')
  update(@Args('updatePortfolioInput') updatePortfolioInput: UpdatePortfolioInput) {
    return this.portfoliosService.update(updatePortfolioInput.id, updatePortfolioInput);
  }

  @Mutation('removePortfolio')
  remove(@Args('id') id: number) {
    return this.portfoliosService.remove(id);
  }
}
