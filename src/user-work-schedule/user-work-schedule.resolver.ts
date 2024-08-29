import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserWorkScheduleService } from './user-work-schedule.service';
import { CreateUserWorkScheduleInput } from './dto/create-user-work-schedule.input';
import { UpdateUserWorkScheduleInput } from './dto/update-user-work-schedule.input';

@Resolver('UserWorkSchedule')
export class UserWorkScheduleResolver {
  constructor(private readonly userWorkScheduleService: UserWorkScheduleService) {}

  @Mutation('createUserWorkSchedule')
  create(@Args('createUserWorkScheduleInput') createUserWorkScheduleInput: CreateUserWorkScheduleInput) {
    return this.userWorkScheduleService.create(createUserWorkScheduleInput);
  }

  @Query('userWorkSchedule')
  findAll() {
    return this.userWorkScheduleService.findAll();
  }

  @Query('userWorkSchedule')
  findOne(@Args('id') id: number) {
    return this.userWorkScheduleService.findOne(id);
  }

  @Mutation('updateUserWorkSchedule')
  update(@Args('updateUserWorkScheduleInput') updateUserWorkScheduleInput: UpdateUserWorkScheduleInput) {
    return this.userWorkScheduleService.update(updateUserWorkScheduleInput.id, updateUserWorkScheduleInput);
  }

  @Mutation('removeUserWorkSchedule')
  remove(@Args('id') id: number) {
    return this.userWorkScheduleService.remove(id);
  }
}
