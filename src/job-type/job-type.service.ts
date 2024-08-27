import { Injectable } from '@nestjs/common';
import { CreateJobTypeInput } from './dto/create-job-type.input';
import { UpdateJobTypeInput } from './dto/update-job-type.input';

@Injectable()
export class JobTypeService {
  create(createJobTypeInput: CreateJobTypeInput) {
    return 'This action adds a new jobType';
  }

  findAll() {
    return `This action returns all jobType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobType`;
  }

  update(id: number, updateJobTypeInput: UpdateJobTypeInput) {
    return `This action updates a #${id} jobType`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobType`;
  }
}
