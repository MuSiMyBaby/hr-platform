import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EducationService } from './education.service';
import { CreateEducationInput } from './dto/create-education.input';
import { UpdateEducationInput } from './dto/update-education.input';

@Resolver('Education')
export class EducationResolver {
  constructor(private readonly educationService: EducationService) {}

  @Mutation('createEducation')
  create(@Args('createEducationInput') createEducationInput: CreateEducationInput) {
    return this.educationService.create(createEducationInput);
  }

  @Query('education')
  findAll() {
    return this.educationService.findAll();
  }

  @Query('education')
  findOne(@Args('id') id: number) {
    return this.educationService.findOne(id);
  }

  @Mutation('updateEducation')
  update(@Args('updateEducationInput') updateEducationInput: UpdateEducationInput) {
    return this.educationService.update(updateEducationInput.id, updateEducationInput);
  }

  @Mutation('removeEducation')
  remove(@Args('id') id: number) {
    return this.educationService.remove(id);
  }
}
