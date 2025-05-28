import { Field, GraphQLTimestamp, ObjectType } from 'type-graphql';

import { Prisma } from '~prisma/client';
import { Decimal } from '~/common/scalars';

@ObjectType('UserReview')
export class UserReview {
  @Field(() => String)
  publicId!: string;

  @Field(() => Decimal)
  score!: Prisma.Decimal;

  @Field(() => String)
  text!: string;

  @Field(() => GraphQLTimestamp)
  createdAt!: Date;
}
