import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class FindRecipeArgs {
  @Field((type) => String, { nullable: true })
  withId?: string;

  @Field((type) => String, { nullable: true })
  withTitle?: string;
}
