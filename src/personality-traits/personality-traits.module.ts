import { Module } from '@nestjs/common';
import { PersonalityTraitsService } from './personality-traits.service';
import { PersonalityTraitsResolver } from './personality-traits.resolver';

@Module({
  providers: [PersonalityTraitsResolver, PersonalityTraitsService],
})
export class PersonalityTraitsModule {}
