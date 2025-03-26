import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { MovieCreateWithoutRatingInput } from '../inputs/MovieCreateWithoutRatingInput';
import { MovieUpdateWithoutRatingInput } from '../inputs/MovieUpdateWithoutRatingInput';
import { MovieWhereInput } from '../inputs/MovieWhereInput';

@TypeGraphQL.InputType('MovieUpsertWithoutRatingInput', {})
export class MovieUpsertWithoutRatingInput {
  @TypeGraphQL.Field((_type) => MovieUpdateWithoutRatingInput, {
    nullable: false,
  })
  update!: MovieUpdateWithoutRatingInput;

  @TypeGraphQL.Field((_type) => MovieCreateWithoutRatingInput, {
    nullable: false,
  })
  create!: MovieCreateWithoutRatingInput;

  @TypeGraphQL.Field((_type) => MovieWhereInput, {
    nullable: true,
  })
  where?: MovieWhereInput | undefined;
}
