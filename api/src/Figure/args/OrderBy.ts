import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class OrderByArgs {
  @Field((type) => String, { nullable: true })
  orderBy?: string;
}
