import { Module } from '@nestjs/common';
import { UserSkillsService } from './user-skills.service';
import { UserSkillsResolver } from './user-skills.resolver';

@Module({
  providers: [UserSkillsResolver, UserSkillsService],
})
export class UserSkillsModule {}
