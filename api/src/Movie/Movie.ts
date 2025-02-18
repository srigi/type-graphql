import { Field, ID, ObjectType } from 'type-graphql';

import { Rating } from '~/Rating/Rating';
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

  @Field((type) => Number)
  avgRating!: number;

  ratings?: Rating[];

  @Field((type) => MovieCount, { nullable: true })
  _count?: MovieCount | null;
}
