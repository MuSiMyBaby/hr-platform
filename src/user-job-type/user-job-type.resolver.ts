import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserJobTypeService } from './user-job-type.service';
import { CreateUserJobTypeInput } from './dto/create-user-job-type.input';
import { UpdateUserJobTypeInput } from './dto/update-user-job-type.input';

@Resolver('UserJobType')
export class UserJobTypeResolver {
  constructor(private readonly userJobTypeService: UserJobTypeService) {}

  @Mutation('createUserJobType')
  create(@Args('createUserJobTypeInput') createUserJobTypeInput: CreateUserJobTypeInput) {
    return this.userJobTypeService.create(createUserJobTypeInput);
  }

  @Query('userJobType')
  findAll() {
    return this.userJobTypeService.findAll();
  }

  @Query('userJobType')
  findOne(@Args('id') id: number) {
    return this.userJobTypeService.findOne(id);
  }

  @Mutation('updateUserJobType')
  update(@Args('updateUserJobTypeInput') updateUserJobTypeInput: UpdateUserJobTypeInput) {
    return this.userJobTypeService.update(updateUserJobTypeInput.id, updateUserJobTypeInput);
  }

  @Mutation('removeUserJobType')
  remove(@Args('id') id: number) {
    return this.userJobTypeService.remove(id);
  }
}
