import { Module } from '@nestjs/common';
import { UserEmergencyContactsService } from './user-emergency-contacts.service';
import { UserEmergencyContactsResolver } from './user-emergency-contacts.resolver';

@Module({
  providers: [UserEmergencyContactsResolver, UserEmergencyContactsService],
})
export class UserEmergencyContactsModule {}
