import { Field, ID, Int, ObjectType, Root } from 'type-graphql';

import { Movie } from '~/Movie/Movie';

@ObjectType('Rating')
export class Rating {
  @Field((type) => Int)
  id!: number;

  @Field((type) => String)
  publicId!: string;

  @Field((type) => Int)
  score!: number;

  @Field((type) => Int)
  createdAt!: number;

  movie!: Movie;
}
