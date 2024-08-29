import { Module } from '@nestjs/common';
import { UserCertificationsService } from './user-certifications.service';
import { UserCertificationsResolver } from './user-certifications.resolver';

@Module({
  providers: [UserCertificationsResolver, UserCertificationsService],
})
export class UserCertificationsModule {}
