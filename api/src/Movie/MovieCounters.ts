import { Field, Int, ObjectType, Root } from 'type-graphql';

@ObjectType('MovieCounters')
export class MovieCounters {
  userReviews!: number;

  @Field((type) => Int, { name: 'userReviews' })
  getUserReviews(@Root() root: MovieCounters): number {
    return root.userReviews;
  }
}
