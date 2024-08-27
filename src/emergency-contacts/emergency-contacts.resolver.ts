import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EmergencyContactsService } from './emergency-contacts.service';
import { CreateEmergencyContactInput } from './dto/create-emergency-contact.input';
import { UpdateEmergencyContactInput } from './dto/update-emergency-contact.input';

@Resolver('EmergencyContact')
export class EmergencyContactsResolver {
  constructor(private readonly emergencyContactsService: EmergencyContactsService) {}

  @Mutation('createEmergencyContact')
  create(@Args('createEmergencyContactInput') createEmergencyContactInput: CreateEmergencyContactInput) {
    return this.emergencyContactsService.create(createEmergencyContactInput);
  }

  @Query('emergencyContacts')
  findAll() {
    return this.emergencyContactsService.findAll();
  }

  @Query('emergencyContact')
  findOne(@Args('id') id: number) {
    return this.emergencyContactsService.findOne(id);
  }

  @Mutation('updateEmergencyContact')
  update(@Args('updateEmergencyContactInput') updateEmergencyContactInput: UpdateEmergencyContactInput) {
    return this.emergencyContactsService.update(updateEmergencyContactInput.id, updateEmergencyContactInput);
  }

  @Mutation('removeEmergencyContact')
  remove(@Args('id') id: number) {
    return this.emergencyContactsService.remove(id);
  }
}
