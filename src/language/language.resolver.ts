import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LanguageService } from './language.service';
import { CreateLanguageInput } from './dto/create-language.input';
import { UpdateLanguageInput } from './dto/update-language.input';

@Resolver('Language')
export class LanguageResolver {
  constructor(private readonly languageService: LanguageService) {}

  @Mutation('createLanguage')
  create(@Args('createLanguageInput') createLanguageInput: CreateLanguageInput) {
    return this.languageService.create(createLanguageInput);
  }

  @Query('language')
  findAll() {
    return this.languageService.findAll();
  }

  @Query('language')
  findOne(@Args('id') id: number) {
    return this.languageService.findOne(id);
  }

  @Mutation('updateLanguage')
  update(@Args('updateLanguageInput') updateLanguageInput: UpdateLanguageInput) {
    return this.languageService.update(updateLanguageInput.id, updateLanguageInput);
  }

  @Mutation('removeLanguage')
  remove(@Args('id') id: number) {
    return this.languageService.remove(id);
  }
}
