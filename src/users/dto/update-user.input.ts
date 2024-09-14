import { CreateUserInput } from './create-user.input'; // 引入 CreateUserInput
import { PartialType, InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}
