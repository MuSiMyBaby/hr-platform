import { Module } from '@nestjs/common';
import { UserLanguageService } from './user-language.service';
import { UserLanguageResolver } from './user-language.resolver';

@Module({
  providers: [UserLanguageResolver, UserLanguageService],
})
export class UserLanguageModule {}
