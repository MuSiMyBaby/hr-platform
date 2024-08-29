import { Module } from '@nestjs/common';
import { UserPortfoliosService } from './user-portfolios.service';
import { UserPortfoliosResolver } from './user-portfolios.resolver';

@Module({
  providers: [UserPortfoliosResolver, UserPortfoliosService],
})
export class UserPortfoliosModule {}
