import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';

@TypeGraphQL.InputType('MovieCreateWithoutRatingInput', {})
export class MovieCreateWithoutRatingInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  publicId!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  name!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  slug!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  released!: string;
}
