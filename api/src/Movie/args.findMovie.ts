import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class FindMovieArgs {
  @Field((type) => String, { nullable: true })
  withPublicId?: string;

  @Field((type) => String, { nullable: true })
  withSlug?: string;
}
