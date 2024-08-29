import { Module } from '@nestjs/common';
import { UserPersonalityTraitsService } from './user-personality-traits.service';
import { UserPersonalityTraitsResolver } from './user-personality-traits.resolver';

@Module({
  providers: [UserPersonalityTraitsResolver, UserPersonalityTraitsService],
})
export class UserPersonalityTraitsModule {}
