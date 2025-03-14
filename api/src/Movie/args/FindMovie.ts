import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class FindMovieArgs {
  @Field((type) => String, { nullable: true })
  publicId?: string;

  @Field((type) => String, { nullable: true })
  slug?: string;
}
