import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EmploymentStatusService } from './employment-status.service';
import { CreateEmploymentStatusInput } from './dto/create-employment-status.input';
import { UpdateEmploymentStatusInput } from './dto/update-employment-status.input';

@Resolver('EmploymentStatus')
export class EmploymentStatusResolver {
  constructor(private readonly employmentStatusService: EmploymentStatusService) {}

  @Mutation('createEmploymentStatus')
  create(@Args('createEmploymentStatusInput') createEmploymentStatusInput: CreateEmploymentStatusInput) {
    return this.employmentStatusService.create(createEmploymentStatusInput);
  }

  @Query('employmentStatus')
  findAll() {
    return this.employmentStatusService.findAll();
  }

  @Query('employmentStatus')
  findOne(@Args('id') id: number) {
    return this.employmentStatusService.findOne(id);
  }

  @Mutation('updateEmploymentStatus')
  update(@Args('updateEmploymentStatusInput') updateEmploymentStatusInput: UpdateEmploymentStatusInput) {
    return this.employmentStatusService.update(updateEmploymentStatusInput.id, updateEmploymentStatusInput);
  }

  @Mutation('removeEmploymentStatus')
  remove(@Args('id') id: number) {
    return this.employmentStatusService.remove(id);
  }
}
