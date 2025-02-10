import { Field, InputType } from 'type-graphql';

@InputType()
export class AddRecipeInput {
  @Field((type) => String)
  title!: string;

  @Field((type) => String, { nullable: true })
  description?: string;
}
