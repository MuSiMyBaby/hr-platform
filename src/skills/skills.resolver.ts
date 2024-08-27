import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SkillsService } from './skills.service';
import { CreateSkillInput } from './dto/create-skill.input';
import { UpdateSkillInput } from './dto/update-skill.input';

@Resolver('Skill')
export class SkillsResolver {
  constructor(private readonly skillsService: SkillsService) {}

  @Mutation('createSkill')
  create(@Args('createSkillInput') createSkillInput: CreateSkillInput) {
    return this.skillsService.create(createSkillInput);
  }

  @Query('skills')
  findAll() {
    return this.skillsService.findAll();
  }

  @Query('skill')
  findOne(@Args('id') id: number) {
    return this.skillsService.findOne(id);
  }

  @Mutation('updateSkill')
  update(@Args('updateSkillInput') updateSkillInput: UpdateSkillInput) {
    return this.skillsService.update(updateSkillInput.id, updateSkillInput);
  }

  @Mutation('removeSkill')
  remove(@Args('id') id: number) {
    return this.skillsService.remove(id);
  }
}
