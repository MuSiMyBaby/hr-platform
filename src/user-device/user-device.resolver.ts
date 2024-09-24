import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserDeviceService } from './user-device.service';
import { UserDevice } from './entities/user-device.entity';
import { CreateUserDeviceInput } from './dto/create-user-device.input';
import { UpdateUserDeviceInput } from './dto/update-user-device.input';

@Resolver(() => UserDevice)
export class UserDeviceResolver {
  constructor(private readonly userDeviceService: UserDeviceService) {}

  @Mutation(() => UserDevice)
  createUserDevice(@Args('createUserDeviceInput') createUserDeviceInput: CreateUserDeviceInput) {
    return this.userDeviceService.create(createUserDeviceInput);
  }

  @Query(() => [UserDevice], { name: 'userDevice' })
  findAll() {
    return this.userDeviceService.findAll();
  }

  @Query(() => UserDevice, { name: 'userDevice' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userDeviceService.findOne(id);
  }

  @Mutation(() => UserDevice)
  updateUserDevice(@Args('updateUserDeviceInput') updateUserDeviceInput: UpdateUserDeviceInput) {
    return this.userDeviceService.update(updateUserDeviceInput.id, updateUserDeviceInput);
  }

  @Mutation(() => UserDevice)
  removeUserDevice(@Args('id', { type: () => Int }) id: number) {
    return this.userDeviceService.remove(id);
  }
}
