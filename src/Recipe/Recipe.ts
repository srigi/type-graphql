import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Recipe {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  title!: string;

  @Field((type) => String, { nullable: true })
  description?: string;
}
