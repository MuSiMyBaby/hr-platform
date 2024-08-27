import { Module } from '@nestjs/common';
import { PersonalStatementsService } from './personal-statements.service';
import { PersonalStatementsResolver } from './personal-statements.resolver';

@Module({
  providers: [PersonalStatementsResolver, PersonalStatementsService],
})
export class PersonalStatementsModule {}
