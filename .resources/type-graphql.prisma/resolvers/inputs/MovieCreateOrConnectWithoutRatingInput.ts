import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { MovieCreateWithoutRatingInput } from '../inputs/MovieCreateWithoutRatingInput';
import { MovieWhereUniqueInput } from '../inputs/MovieWhereUniqueInput';

@TypeGraphQL.InputType('MovieCreateOrConnectWithoutRatingInput', {})
export class MovieCreateOrConnectWithoutRatingInput {
  @TypeGraphQL.Field((_type) => MovieWhereUniqueInput, {
    nullable: false,
  })
  where!: MovieWhereUniqueInput;

  @TypeGraphQL.Field((_type) => MovieCreateWithoutRatingInput, {
    nullable: false,
  })
  create!: MovieCreateWithoutRatingInput;
}
