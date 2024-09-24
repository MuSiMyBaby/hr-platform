import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserIp {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
