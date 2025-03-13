import { Field, GraphQLTimestamp, ObjectType } from 'type-graphql';

import { Prisma } from '~prisma/client';
import { Decimal } from '~/common/scalars';

@ObjectType('UserReview')
export class UserReview {
  @Field((type) => String)
  publicId!: string;

  @Field((type) => Decimal)
  score!: Prisma.Decimal;

  @Field((type) => String)
  text!: string;

  @Field((type) => GraphQLTimestamp)
  createdAt!: Date;
}
