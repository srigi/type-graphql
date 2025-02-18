import { Field, Int, ObjectType, Root } from 'type-graphql';

@ObjectType('MovieCount')
export class MovieCount {
  rating!: number;

  @Field((type) => Int, { name: 'rating' })
  getRating(@Root() root: MovieCount): number {
    return root.rating;
  }
}
