import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PersonalStatementsService } from './personal-statements.service';
import { CreatePersonalStatementInput } from './dto/create-personal-statement.input';
import { UpdatePersonalStatementInput } from './dto/update-personal-statement.input';

@Resolver('PersonalStatement')
export class PersonalStatementsResolver {
  constructor(private readonly personalStatementsService: PersonalStatementsService) {}

  @Mutation('createPersonalStatement')
  create(@Args('createPersonalStatementInput') createPersonalStatementInput: CreatePersonalStatementInput) {
    return this.personalStatementsService.create(createPersonalStatementInput);
  }

  @Query('personalStatements')
  findAll() {
    return this.personalStatementsService.findAll();
  }

  @Query('personalStatement')
  findOne(@Args('id') id: number) {
    return this.personalStatementsService.findOne(id);
  }

  @Mutation('updatePersonalStatement')
  update(@Args('updatePersonalStatementInput') updatePersonalStatementInput: UpdatePersonalStatementInput) {
    return this.personalStatementsService.update(updatePersonalStatementInput.id, updatePersonalStatementInput);
  }

  @Mutation('removePersonalStatement')
  remove(@Args('id') id: number) {
    return this.personalStatementsService.remove(id);
  }
}
