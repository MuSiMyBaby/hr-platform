import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PersonalityTraitsService } from './personality-traits.service';
import { CreatePersonalityTraitInput } from './dto/create-personality-trait.input';
import { UpdatePersonalityTraitInput } from './dto/update-personality-trait.input';

@Resolver('PersonalityTrait')
export class PersonalityTraitsResolver {
  constructor(private readonly personalityTraitsService: PersonalityTraitsService) {}

  @Mutation('createPersonalityTrait')
  create(@Args('createPersonalityTraitInput') createPersonalityTraitInput: CreatePersonalityTraitInput) {
    return this.personalityTraitsService.create(createPersonalityTraitInput);
  }

  @Query('personalityTraits')
  findAll() {
    return this.personalityTraitsService.findAll();
  }

  @Query('personalityTrait')
  findOne(@Args('id') id: number) {
    return this.personalityTraitsService.findOne(id);
  }

  @Mutation('updatePersonalityTrait')
  update(@Args('updatePersonalityTraitInput') updatePersonalityTraitInput: UpdatePersonalityTraitInput) {
    return this.personalityTraitsService.update(updatePersonalityTraitInput.id, updatePersonalityTraitInput);
  }

  @Mutation('removePersonalityTrait')
  remove(@Args('id') id: number) {
    return this.personalityTraitsService.remove(id);
  }
}
