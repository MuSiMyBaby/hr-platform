import { Injectable } from '@nestjs/common';
import { CreateCertificationInput } from './dto/create-certification.input';
import { UpdateCertificationInput } from './dto/update-certification.input';

@Injectable()
export class CertificationsService {
  create(createCertificationInput: CreateCertificationInput) {
    return 'This action adds a new certification';
  }

  findAll() {
    return `This action returns all certifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} certification`;
  }

  update(id: number, updateCertificationInput: UpdateCertificationInput) {
    return `This action updates a #${id} certification`;
  }

  remove(id: number) {
    return `This action removes a #${id} certification`;
  }
}
