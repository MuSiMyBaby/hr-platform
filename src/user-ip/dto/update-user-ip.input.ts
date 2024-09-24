import { CreateUserIpInput } from './create-user-ip.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserIpInput extends PartialType(CreateUserIpInput) {
  @Field(() => Int)
  id: number;
}
