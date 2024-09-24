import { Module } from '@nestjs/common';
import { UserIpService } from './user-ip.service';
import { UserIpResolver } from './user-ip.resolver';

@Module({
  providers: [UserIpResolver, UserIpService],
})
export class UserIpModule {}
