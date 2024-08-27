import { Injectable } from '@nestjs/common';
import { CreateEmploymentStatusInput } from './dto/create-employment-status.input';
import { UpdateEmploymentStatusInput } from './dto/update-employment-status.input';

@Injectable()
export class EmploymentStatusService {
  create(createEmploymentStatusInput: CreateEmploymentStatusInput) {
    return 'This action adds a new employmentStatus';
  }

  findAll() {
    return `This action returns all employmentStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employmentStatus`;
  }

  update(id: number, updateEmploymentStatusInput: UpdateEmploymentStatusInput) {
    return `This action updates a #${id} employmentStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} employmentStatus`;
  }
}
