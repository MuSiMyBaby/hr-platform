import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserIpService } from './user-ip.service';
import { UserIp } from './entities/user-ip.entity';
import { CreateUserIpInput } from './dto/create-user-ip.input';
import { UpdateUserIpInput } from './dto/update-user-ip.input';

@Resolver(() => UserIp)
export class UserIpResolver {
  constructor(private readonly userIpService: UserIpService) {}

  @Mutation(() => UserIp)
  createUserIp(@Args('createUserIpInput') createUserIpInput: CreateUserIpInput) {
    return this.userIpService.create(createUserIpInput);
  }

  @Query(() => [UserIp], { name: 'userIp' })
  findAll() {
    return this.userIpService.findAll();
  }

  @Query(() => UserIp, { name: 'userIp' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userIpService.findOne(id);
  }

  @Mutation(() => UserIp)
  updateUserIp(@Args('updateUserIpInput') updateUserIpInput: UpdateUserIpInput) {
    return this.userIpService.update(updateUserIpInput.id, updateUserIpInput);
  }

  @Mutation(() => UserIp)
  removeUserIp(@Args('id', { type: () => Int }) id: number) {
    return this.userIpService.remove(id);
  }
}
