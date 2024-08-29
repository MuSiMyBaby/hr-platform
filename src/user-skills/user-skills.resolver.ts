import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserSkillsService } from './user-skills.service';
import { CreateUserSkillInput } from './dto/create-user-skill.input';
import { UpdateUserSkillInput } from './dto/update-user-skill.input';

@Resolver('UserSkill')
export class UserSkillsResolver {
  constructor(private readonly userSkillsService: UserSkillsService) {}

  @Mutation('createUserSkill')
  create(@Args('createUserSkillInput') createUserSkillInput: CreateUserSkillInput) {
    return this.userSkillsService.create(createUserSkillInput);
  }

  @Query('userSkills')
  findAll() {
    return this.userSkillsService.findAll();
  }

  @Query('userSkill')
  findOne(@Args('id') id: number) {
    return this.userSkillsService.findOne(id);
  }

  @Mutation('updateUserSkill')
  update(@Args('updateUserSkillInput') updateUserSkillInput: UpdateUserSkillInput) {
    return this.userSkillsService.update(updateUserSkillInput.id, updateUserSkillInput);
  }

  @Mutation('removeUserSkill')
  remove(@Args('id') id: number) {
    return this.userSkillsService.remove(id);
  }
}
