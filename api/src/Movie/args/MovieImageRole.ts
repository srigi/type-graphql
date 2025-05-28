import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class MovieImageRoleArg {
  @Field(() => String)
  role!: string;
}
