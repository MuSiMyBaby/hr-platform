import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserPhotosService } from './user-photos.service';
import { CreateUserPhotoInput } from './dto/create-user-photo.input';
import { UpdateUserPhotoInput } from './dto/update-user-photo.input';

@Resolver('UserPhoto')
export class UserPhotosResolver {
  constructor(private readonly userPhotosService: UserPhotosService) {}

  @Mutation('createUserPhoto')
  create(@Args('createUserPhotoInput') createUserPhotoInput: CreateUserPhotoInput) {
    return this.userPhotosService.create(createUserPhotoInput);
  }

  @Query('userPhotos')
  findAll() {
    return this.userPhotosService.findAll();
  }

  @Query('userPhoto')
  findOne(@Args('id') id: number) {
    return this.userPhotosService.findOne(id);
  }

  @Mutation('updateUserPhoto')
  update(@Args('updateUserPhotoInput') updateUserPhotoInput: UpdateUserPhotoInput) {
    return this.userPhotosService.update(updateUserPhotoInput.id, updateUserPhotoInput);
  }

  @Mutation('removeUserPhoto')
  remove(@Args('id') id: number) {
    return this.userPhotosService.remove(id);
  }
}
