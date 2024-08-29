import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserCertificationsService } from './user-certifications.service';
import { CreateUserCertificationInput } from './dto/create-user-certification.input';
import { UpdateUserCertificationInput } from './dto/update-user-certification.input';

@Resolver('UserCertification')
export class UserCertificationsResolver {
  constructor(private readonly userCertificationsService: UserCertificationsService) {}

  @Mutation('createUserCertification')
  create(@Args('createUserCertificationInput') createUserCertificationInput: CreateUserCertificationInput) {
    return this.userCertificationsService.create(createUserCertificationInput);
  }

  @Query('userCertifications')
  findAll() {
    return this.userCertificationsService.findAll();
  }

  @Query('userCertification')
  findOne(@Args('id') id: number) {
    return this.userCertificationsService.findOne(id);
  }

  @Mutation('updateUserCertification')
  update(@Args('updateUserCertificationInput') updateUserCertificationInput: UpdateUserCertificationInput) {
    return this.userCertificationsService.update(updateUserCertificationInput.id, updateUserCertificationInput);
  }

  @Mutation('removeUserCertification')
  remove(@Args('id') id: number) {
    return this.userCertificationsService.remove(id);
  }
}
