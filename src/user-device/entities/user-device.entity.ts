import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserDevice {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
