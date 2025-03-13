import { Field, ObjectType } from 'type-graphql';

import { Prisma } from '~prisma/client';
import { Decimal } from '~/common/scalars';

@ObjectType('CloudImage')
export class CloudImage {
  @Field((type) => String)
  publicId!: string;

  @Field((type) => String)
  alt!: string;

  @Field((type) => Decimal)
  AR!: Prisma.Decimal;

  @Field((type) => String)
  role!: string;
}
