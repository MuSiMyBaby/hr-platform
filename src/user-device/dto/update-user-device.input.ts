import { CreateUserDeviceInput } from './create-user-device.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDeviceInput extends PartialType(CreateUserDeviceInput) {
  @Field(() => Int)
  id: number;
}
