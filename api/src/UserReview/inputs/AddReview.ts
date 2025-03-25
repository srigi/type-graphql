import { InputType, Field } from 'type-graphql';

import { Decimal } from '~/common/scalars';
import { Prisma } from '~prisma/client';

@InputType()
export class AddReviewInput {
  @Field(() => String)
  moviePublicId!: string;

  @Field(() => String)
  text!: string;

  @Field(() => Decimal)
  score!: Prisma.Decimal;
}
