import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserEducationService } from './user-education.service';
import { CreateUserEducationInput } from './dto/create-user-education.input';
import { UpdateUserEducationInput } from './dto/update-user-education.input';

@Resolver('UserEducation')
export class UserEducationResolver {
  constructor(private readonly userEducationService: UserEducationService) {}

  @Mutation('createUserEducation')
  create(@Args('createUserEducationInput') createUserEducationInput: CreateUserEducationInput) {
    return this.userEducationService.create(createUserEducationInput);
  }

  @Query('userEducation')
  findAll() {
    return this.userEducationService.findAll();
  }

  @Query('userEducation')
  findOne(@Args('id') id: number) {
    return this.userEducationService.findOne(id);
  }

  @Mutation('updateUserEducation')
  update(@Args('updateUserEducationInput') updateUserEducationInput: UpdateUserEducationInput) {
    return this.userEducationService.update(updateUserEducationInput.id, updateUserEducationInput);
  }

  @Mutation('removeUserEducation')
  remove(@Args('id') id: number) {
    return this.userEducationService.remove(id);
  }
}
