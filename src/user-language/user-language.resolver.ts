import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserLanguageService } from './user-language.service';
import { CreateUserLanguageInput } from './dto/create-user-language.input';
import { UpdateUserLanguageInput } from './dto/update-user-language.input';

@Resolver('UserLanguage')
export class UserLanguageResolver {
  constructor(private readonly userLanguageService: UserLanguageService) {}

  @Mutation('createUserLanguage')
  create(@Args('createUserLanguageInput') createUserLanguageInput: CreateUserLanguageInput) {
    return this.userLanguageService.create(createUserLanguageInput);
  }

  @Query('userLanguage')
  findAll() {
    return this.userLanguageService.findAll();
  }

  @Query('userLanguage')
  findOne(@Args('id') id: number) {
    return this.userLanguageService.findOne(id);
  }

  @Mutation('updateUserLanguage')
  update(@Args('updateUserLanguageInput') updateUserLanguageInput: UpdateUserLanguageInput) {
    return this.userLanguageService.update(updateUserLanguageInput.id, updateUserLanguageInput);
  }

  @Mutation('removeUserLanguage')
  remove(@Args('id') id: number) {
    return this.userLanguageService.remove(id);
  }
}
