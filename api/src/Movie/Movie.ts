import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Movie {
  @Field((type) => ID)
  publicId!: string;

  @Field((type) => String)
  name!: string;

  @Field((type) => String)
  slug!: string;

  @Field((type) => String)
  released!: string;
}
