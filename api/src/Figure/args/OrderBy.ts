import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class OrderByArgs {
  @Field(() => String, { nullable: true })
  orderBy?: string;
}
