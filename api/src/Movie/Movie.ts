import { Field, ID, ObjectType } from 'type-graphql';

import { Prisma } from '~prisma/client';
import { Decimal } from '~/common/scalars';
import { MovieCounters } from './MovieCounters';

@ObjectType()
export class Movie {
  @Field(() => ID)
  publicId!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  slug!: string;

  @Field(() => String)
  releasedIn!: string;

  @Field(() => String)
  story!: string;

  @Field(() => Decimal)
  avgScore!: Prisma.Decimal;

  @Field(() => MovieCounters, { nullable: true })
  _count?: MovieCounters | null;
}
