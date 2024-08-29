import { Module } from '@nestjs/common';
import { UserTransportationService } from './user-transportation.service';
import { UserTransportationResolver } from './user-transportation.resolver';

@Module({
  providers: [UserTransportationResolver, UserTransportationService],
})
export class UserTransportationModule {}
