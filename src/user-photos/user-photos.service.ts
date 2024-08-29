import { Injectable } from '@nestjs/common';
import { CreateUserPhotoInput } from './dto/create-user-photo.input';
import { UpdateUserPhotoInput } from './dto/update-user-photo.input';

@Injectable()
export class UserPhotosService {
  create(createUserPhotoInput: CreateUserPhotoInput) {
    return 'This action adds a new userPhoto';
  }

  findAll() {
    return `This action returns all userPhotos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPhoto`;
  }

  update(id: number, updateUserPhotoInput: UpdateUserPhotoInput) {
    return `This action updates a #${id} userPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} userPhoto`;
  }
}
