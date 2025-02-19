import { Field, Int, ObjectType, Root } from 'type-graphql';

@ObjectType('MovieCount')
export class MovieCount {
  userReviews!: number;

  @Field((type) => Int, { name: 'userReviews' })
  getUserReviews(@Root() root: MovieCount): number {
    return root.userReviews;
  }
}
