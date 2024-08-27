import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WorkService } from './work.service';
import { CreateWorkInput } from './dto/create-work.input';
import { UpdateWorkInput } from './dto/update-work.input';

@Resolver('Work')
export class WorkResolver {
  constructor(private readonly workService: WorkService) {}

  @Mutation('createWork')
  create(@Args('createWorkInput') createWorkInput: CreateWorkInput) {
    return this.workService.create(createWorkInput);
  }

  @Query('work')
  findAll() {
    return this.workService.findAll();
  }

  @Query('work')
  findOne(@Args('id') id: number) {
    return this.workService.findOne(id);
  }

  @Mutation('updateWork')
  update(@Args('updateWorkInput') updateWorkInput: UpdateWorkInput) {
    return this.workService.update(updateWorkInput.id, updateWorkInput);
  }

  @Mutation('removeWork')
  remove(@Args('id') id: number) {
    return this.workService.remove(id);
  }
}
