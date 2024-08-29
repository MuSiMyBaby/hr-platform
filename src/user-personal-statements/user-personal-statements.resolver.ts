import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserPersonalStatementsService } from './user-personal-statements.service';
import { CreateUserPersonalStatementInput } from './dto/create-user-personal-statement.input';
import { UpdateUserPersonalStatementInput } from './dto/update-user-personal-statement.input';

@Resolver('UserPersonalStatement')
export class UserPersonalStatementsResolver {
  constructor(private readonly userPersonalStatementsService: UserPersonalStatementsService) {}

  @Mutation('createUserPersonalStatement')
  create(@Args('createUserPersonalStatementInput') createUserPersonalStatementInput: CreateUserPersonalStatementInput) {
    return this.userPersonalStatementsService.create(createUserPersonalStatementInput);
  }

  @Query('userPersonalStatements')
  findAll() {
    return this.userPersonalStatementsService.findAll();
  }

  @Query('userPersonalStatement')
  findOne(@Args('id') id: number) {
    return this.userPersonalStatementsService.findOne(id);
  }

  @Mutation('updateUserPersonalStatement')
  update(@Args('updateUserPersonalStatementInput') updateUserPersonalStatementInput: UpdateUserPersonalStatementInput) {
    return this.userPersonalStatementsService.update(updateUserPersonalStatementInput.id, updateUserPersonalStatementInput);
  }

  @Mutation('removeUserPersonalStatement')
  remove(@Args('id') id: number) {
    return this.userPersonalStatementsService.remove(id);
  }
}
