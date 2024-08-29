import { Module } from '@nestjs/common';
import { UserWorkService } from './user-work.service';
import { UserWorkResolver } from './user-work.resolver';

@Module({
  providers: [UserWorkResolver, UserWorkService],
})
export class UserWorkModule {}
