import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class ImageMovieRoleArg {
  @Field((type) => String)
  role!: string;
}
