import { Module } from '@nestjs/common';
import { CertificationsService } from './certifications.service';
import { CertificationsResolver } from './certifications.resolver';

@Module({
  providers: [CertificationsResolver, CertificationsService],
})
export class CertificationsModule {}
