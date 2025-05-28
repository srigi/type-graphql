import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class FindByIdentifierArgs {
  @Field(() => String, { nullable: true })
  publicId?: string;

  @Field(() => String, { nullable: true })
  slug?: string;
}
