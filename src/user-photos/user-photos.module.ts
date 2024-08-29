import { Module } from '@nestjs/common';
import { UserPhotosService } from './user-photos.service';
import { UserPhotosResolver } from './user-photos.resolver';

@Module({
  providers: [UserPhotosResolver, UserPhotosService],
})
export class UserPhotosModule {}
