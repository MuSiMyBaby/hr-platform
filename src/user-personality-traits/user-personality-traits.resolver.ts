import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserPersonalityTraitsService } from './user-personality-traits.service';
import { CreateUserPersonalityTraitInput } from './dto/create-user-personality-trait.input';
import { UpdateUserPersonalityTraitInput } from './dto/update-user-personality-trait.input';

@Resolver('UserPersonalityTrait')
export class UserPersonalityTraitsResolver {
  constructor(private readonly userPersonalityTraitsService: UserPersonalityTraitsService) {}

  @Mutation('createUserPersonalityTrait')
  create(@Args('createUserPersonalityTraitInput') createUserPersonalityTraitInput: CreateUserPersonalityTraitInput) {
    return this.userPersonalityTraitsService.create(createUserPersonalityTraitInput);
  }

  @Query('userPersonalityTraits')
  findAll() {
    return this.userPersonalityTraitsService.findAll();
  }

  @Query('userPersonalityTrait')
  findOne(@Args('id') id: number) {
    return this.userPersonalityTraitsService.findOne(id);
  }

  @Mutation('updateUserPersonalityTrait')
  update(@Args('updateUserPersonalityTraitInput') updateUserPersonalityTraitInput: UpdateUserPersonalityTraitInput) {
    return this.userPersonalityTraitsService.update(updateUserPersonalityTraitInput.id, updateUserPersonalityTraitInput);
  }

  @Mutation('removeUserPersonalityTrait')
  remove(@Args('id') id: number) {
    return this.userPersonalityTraitsService.remove(id);
  }
}
