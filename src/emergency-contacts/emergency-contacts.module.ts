import { Module } from '@nestjs/common';
import { EmergencyContactsService } from './emergency-contacts.service';
import { EmergencyContactsResolver } from './emergency-contacts.resolver';

@Module({
  providers: [EmergencyContactsResolver, EmergencyContactsService],
})
export class EmergencyContactsModule {}
