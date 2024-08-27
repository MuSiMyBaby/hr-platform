import { Injectable } from '@nestjs/common';
import { CreateEducationInput } from './dto/create-education.input';
import { UpdateEducationInput } from './dto/update-education.input';

@Injectable()
export class EducationService {
  create(createEducationInput: CreateEducationInput) {
    return 'This action adds a new education';
  }

  findAll() {
    return `This action returns all education`;
  }

  findOne(id: number) {
    return `This action returns a #${id} education`;
  }

  update(id: number, updateEducationInput: UpdateEducationInput) {
    return `This action updates a #${id} education`;
  }

  remove(id: number) {
    return `This action removes a #${id} education`;
  }
}
