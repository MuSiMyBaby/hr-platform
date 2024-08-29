import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserEmergencyContactsService } from './user-emergency-contacts.service';
import { CreateUserEmergencyContactInput } from './dto/create-user-emergency-contact.input';
import { UpdateUserEmergencyContactInput } from './dto/update-user-emergency-contact.input';

@Resolver('UserEmergencyContact')
export class UserEmergencyContactsResolver {
  constructor(private readonly userEmergencyContactsService: UserEmergencyContactsService) {}

  @Mutation('createUserEmergencyContact')
  create(@Args('createUserEmergencyContactInput') createUserEmergencyContactInput: CreateUserEmergencyContactInput) {
    return this.userEmergencyContactsService.create(createUserEmergencyContactInput);
  }

  @Query('userEmergencyContacts')
  findAll() {
    return this.userEmergencyContactsService.findAll();
  }

  @Query('userEmergencyContact')
  findOne(@Args('id') id: number) {
    return this.userEmergencyContactsService.findOne(id);
  }

  @Mutation('updateUserEmergencyContact')
  update(@Args('updateUserEmergencyContactInput') updateUserEmergencyContactInput: UpdateUserEmergencyContactInput) {
    return this.userEmergencyContactsService.update(updateUserEmergencyContactInput.id, updateUserEmergencyContactInput);
  }

  @Mutation('removeUserEmergencyContact')
  remove(@Args('id') id: number) {
    return this.userEmergencyContactsService.remove(id);
  }
}
