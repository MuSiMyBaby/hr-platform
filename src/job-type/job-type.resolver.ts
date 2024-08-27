import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JobTypeService } from './job-type.service';
import { CreateJobTypeInput } from './dto/create-job-type.input';
import { UpdateJobTypeInput } from './dto/update-job-type.input';

@Resolver('JobType')
export class JobTypeResolver {
  constructor(private readonly jobTypeService: JobTypeService) {}

  @Mutation('createJobType')
  create(@Args('createJobTypeInput') createJobTypeInput: CreateJobTypeInput) {
    return this.jobTypeService.create(createJobTypeInput);
  }

  @Query('jobType')
  findAll() {
    return this.jobTypeService.findAll();
  }

  @Query('jobType')
  findOne(@Args('id') id: number) {
    return this.jobTypeService.findOne(id);
  }

  @Mutation('updateJobType')
  update(@Args('updateJobTypeInput') updateJobTypeInput: UpdateJobTypeInput) {
    return this.jobTypeService.update(updateJobTypeInput.id, updateJobTypeInput);
  }

  @Mutation('removeJobType')
  remove(@Args('id') id: number) {
    return this.jobTypeService.remove(id);
  }
}
