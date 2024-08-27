import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WorkScheduleService } from './work-schedule.service';
import { CreateWorkScheduleInput } from './dto/create-work-schedule.input';
import { UpdateWorkScheduleInput } from './dto/update-work-schedule.input';

@Resolver('WorkSchedule')
export class WorkScheduleResolver {
  constructor(private readonly workScheduleService: WorkScheduleService) {}

  @Mutation('createWorkSchedule')
  create(@Args('createWorkScheduleInput') createWorkScheduleInput: CreateWorkScheduleInput) {
    return this.workScheduleService.create(createWorkScheduleInput);
  }

  @Query('workSchedule')
  findAll() {
    return this.workScheduleService.findAll();
  }

  @Query('workSchedule')
  findOne(@Args('id') id: number) {
    return this.workScheduleService.findOne(id);
  }

  @Mutation('updateWorkSchedule')
  update(@Args('updateWorkScheduleInput') updateWorkScheduleInput: UpdateWorkScheduleInput) {
    return this.workScheduleService.update(updateWorkScheduleInput.id, updateWorkScheduleInput);
  }

  @Mutation('removeWorkSchedule')
  remove(@Args('id') id: number) {
    return this.workScheduleService.remove(id);
  }
}
