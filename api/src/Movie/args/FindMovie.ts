import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class FindMovieArgs {
  @Field((type) => String)
  publicId!: string;
}
