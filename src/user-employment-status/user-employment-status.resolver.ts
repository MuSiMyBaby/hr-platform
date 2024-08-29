import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserEmploymentStatusService } from './user-employment-status.service';
import { CreateUserEmploymentStatusInput } from './dto/create-user-employment-status.input';
import { UpdateUserEmploymentStatusInput } from './dto/update-user-employment-status.input';

@Resolver('UserEmploymentStatus')
export class UserEmploymentStatusResolver {
  constructor(private readonly userEmploymentStatusService: UserEmploymentStatusService) {}

  @Mutation('createUserEmploymentStatus')
  create(@Args('createUserEmploymentStatusInput') createUserEmploymentStatusInput: CreateUserEmploymentStatusInput) {
    return this.userEmploymentStatusService.create(createUserEmploymentStatusInput);
  }

  @Query('userEmploymentStatus')
  findAll() {
    return this.userEmploymentStatusService.findAll();
  }

  @Query('userEmploymentStatus')
  findOne(@Args('id') id: number) {
    return this.userEmploymentStatusService.findOne(id);
  }

  @Mutation('updateUserEmploymentStatus')
  update(@Args('updateUserEmploymentStatusInput') updateUserEmploymentStatusInput: UpdateUserEmploymentStatusInput) {
    return this.userEmploymentStatusService.update(updateUserEmploymentStatusInput.id, updateUserEmploymentStatusInput);
  }

  @Mutation('removeUserEmploymentStatus')
  remove(@Args('id') id: number) {
    return this.userEmploymentStatusService.remove(id);
  }
}
