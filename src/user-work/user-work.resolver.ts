import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserWorkService } from './user-work.service';
import { CreateUserWorkInput } from './dto/create-user-work.input';
import { UpdateUserWorkInput } from './dto/update-user-work.input';

@Resolver('UserWork')
export class UserWorkResolver {
  constructor(private readonly userWorkService: UserWorkService) {}

  @Mutation('createUserWork')
  create(@Args('createUserWorkInput') createUserWorkInput: CreateUserWorkInput) {
    return this.userWorkService.create(createUserWorkInput);
  }

  @Query('userWork')
  findAll() {
    return this.userWorkService.findAll();
  }

  @Query('userWork')
  findOne(@Args('id') id: number) {
    return this.userWorkService.findOne(id);
  }

  @Mutation('updateUserWork')
  update(@Args('updateUserWorkInput') updateUserWorkInput: UpdateUserWorkInput) {
    return this.userWorkService.update(updateUserWorkInput.id, updateUserWorkInput);
  }

  @Mutation('removeUserWork')
  remove(@Args('id') id: number) {
    return this.userWorkService.remove(id);
  }
}
