import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';

@TypeGraphQL.ObjectType('MovieSumAggregate', {})
export class MovieSumAggregate {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  id!: number | null;
}
