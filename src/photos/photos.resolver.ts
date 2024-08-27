import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PhotosService } from './photos.service';
import { CreatePhotoInput } from './dto/create-photo.input';
import { UpdatePhotoInput } from './dto/update-photo.input';

@Resolver('Photo')
export class PhotosResolver {
  constructor(private readonly photosService: PhotosService) {}

  @Mutation('createPhoto')
  create(@Args('createPhotoInput') createPhotoInput: CreatePhotoInput) {
    return this.photosService.create(createPhotoInput);
  }

  @Query('photos')
  findAll() {
    return this.photosService.findAll();
  }

  @Query('photo')
  findOne(@Args('id') id: number) {
    return this.photosService.findOne(id);
  }

  @Mutation('updatePhoto')
  update(@Args('updatePhotoInput') updatePhotoInput: UpdatePhotoInput) {
    return this.photosService.update(updatePhotoInput.id, updatePhotoInput);
  }

  @Mutation('removePhoto')
  remove(@Args('id') id: number) {
    return this.photosService.remove(id);
  }
}
