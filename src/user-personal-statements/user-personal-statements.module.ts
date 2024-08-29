import { Module } from '@nestjs/common';
import { UserPersonalStatementsService } from './user-personal-statements.service';
import { UserPersonalStatementsResolver } from './user-personal-statements.resolver';

@Module({
  providers: [UserPersonalStatementsResolver, UserPersonalStatementsService],
})
export class UserPersonalStatementsModule {}
