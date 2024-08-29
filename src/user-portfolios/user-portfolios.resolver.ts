import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserPortfoliosService } from './user-portfolios.service';
import { CreateUserPortfolioInput } from './dto/create-user-portfolio.input';
import { UpdateUserPortfolioInput } from './dto/update-user-portfolio.input';

@Resolver('UserPortfolio')
export class UserPortfoliosResolver {
  constructor(private readonly userPortfoliosService: UserPortfoliosService) {}

  @Mutation('createUserPortfolio')
  create(@Args('createUserPortfolioInput') createUserPortfolioInput: CreateUserPortfolioInput) {
    return this.userPortfoliosService.create(createUserPortfolioInput);
  }

  @Query('userPortfolios')
  findAll() {
    return this.userPortfoliosService.findAll();
  }

  @Query('userPortfolio')
  findOne(@Args('id') id: number) {
    return this.userPortfoliosService.findOne(id);
  }

  @Mutation('updateUserPortfolio')
  update(@Args('updateUserPortfolioInput') updateUserPortfolioInput: UpdateUserPortfolioInput) {
    return this.userPortfoliosService.update(updateUserPortfolioInput.id, updateUserPortfolioInput);
  }

  @Mutation('removeUserPortfolio')
  remove(@Args('id') id: number) {
    return this.userPortfoliosService.remove(id);
  }
}
