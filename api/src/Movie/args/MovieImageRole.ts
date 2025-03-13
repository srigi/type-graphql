import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class MovieImageRoleArg {
  @Field((type) => String)
  role!: string;
}
