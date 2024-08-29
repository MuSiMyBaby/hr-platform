import { Injectable } from '@nestjs/common';
import { CreateUserCertificationInput } from './dto/create-user-certification.input';
import { UpdateUserCertificationInput } from './dto/update-user-certification.input';

@Injectable()
export class UserCertificationsService {
  create(createUserCertificationInput: CreateUserCertificationInput) {
    return 'This action adds a new userCertification';
  }

  findAll() {
    return `This action returns all userCertifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCertification`;
  }

  update(id: number, updateUserCertificationInput: UpdateUserCertificationInput) {
    return `This action updates a #${id} userCertification`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCertification`;
  }
}
