import { Field, ID, ObjectType } from 'type-graphql';

import { Prisma } from '~prisma/client';
import { Decimal } from '~/common/scalars';
import { UserReview } from '~/UserReview/UserReview';
import { MovieCount } from './MovieCount';

@ObjectType()
export class Movie {
  @Field((type) => ID)
  publicId!: string;

  @Field((type) => String)
  name!: string;

  @Field((type) => String)
  releasedIn!: string;

  @Field((type) => String)
  story!: string;

  @Field((type) => Decimal)
  avgScore!: Prisma.Decimal;

  @Field((type) => MovieCount, { nullable: true })
  _count?: MovieCount | null;

  userReviews!: UserReview[];
}
