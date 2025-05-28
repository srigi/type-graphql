import { Field, ObjectType } from 'type-graphql';

import { Prisma } from '~prisma/client';
import { Decimal } from '~/common/scalars';

@ObjectType('CloudImage')
export class CloudImage {
  @Field(() => String)
  publicId!: string;

  @Field(() => String)
  alt!: string;

  @Field(() => Decimal)
  AR!: Prisma.Decimal;

  @Field(() => String)
  role!: string;
}
