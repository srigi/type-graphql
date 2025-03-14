import { Field, ID, ObjectType } from 'type-graphql';

import { Prisma } from '~prisma/client';
import { Decimal } from '~/common/scalars';
import { MovieCounters } from './MovieCounters';

@ObjectType()
export class Movie {
  @Field((type) => ID)
  publicId!: string;

  @Field((type) => String)
  name!: string;

  @Field((type) => String)
  slug!: string;

  @Field((type) => String)
  releasedIn!: string;

  @Field((type) => String)
  story!: string;

  @Field((type) => Decimal)
  avgScore!: Prisma.Decimal;

  @Field((type) => MovieCounters, { nullable: true })
  _count?: MovieCounters | null;
}
