import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { RatingCreateWithoutMovieInput } from '../inputs/RatingCreateWithoutMovieInput';
import { RatingUpdateWithoutMovieInput } from '../inputs/RatingUpdateWithoutMovieInput';
import { RatingWhereUniqueInput } from '../inputs/RatingWhereUniqueInput';

@TypeGraphQL.InputType('RatingUpsertWithWhereUniqueWithoutMovieInput', {})
export class RatingUpsertWithWhereUniqueWithoutMovieInput {
  @TypeGraphQL.Field((_type) => RatingWhereUniqueInput, {
    nullable: false,
  })
  where!: RatingWhereUniqueInput;

  @TypeGraphQL.Field((_type) => RatingUpdateWithoutMovieInput, {
    nullable: false,
  })
  update!: RatingUpdateWithoutMovieInput;

  @TypeGraphQL.Field((_type) => RatingCreateWithoutMovieInput, {
    nullable: false,
  })
  create!: RatingCreateWithoutMovieInput;
}
