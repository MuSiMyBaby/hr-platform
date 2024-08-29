import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserTransportationService } from './user-transportation.service';
import { CreateUserTransportationInput } from './dto/create-user-transportation.input';
import { UpdateUserTransportationInput } from './dto/update-user-transportation.input';

@Resolver('UserTransportation')
export class UserTransportationResolver {
  constructor(private readonly userTransportationService: UserTransportationService) {}

  @Mutation('createUserTransportation')
  create(@Args('createUserTransportationInput') createUserTransportationInput: CreateUserTransportationInput) {
    return this.userTransportationService.create(createUserTransportationInput);
  }

  @Query('userTransportation')
  findAll() {
    return this.userTransportationService.findAll();
  }

  @Query('userTransportation')
  findOne(@Args('id') id: number) {
    return this.userTransportationService.findOne(id);
  }

  @Mutation('updateUserTransportation')
  update(@Args('updateUserTransportationInput') updateUserTransportationInput: UpdateUserTransportationInput) {
    return this.userTransportationService.update(updateUserTransportationInput.id, updateUserTransportationInput);
  }

  @Mutation('removeUserTransportation')
  remove(@Args('id') id: number) {
    return this.userTransportationService.remove(id);
  }
}
