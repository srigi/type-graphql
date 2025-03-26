import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { RatingUpdateWithoutMovieInput } from '../inputs/RatingUpdateWithoutMovieInput';
import { RatingWhereUniqueInput } from '../inputs/RatingWhereUniqueInput';

@TypeGraphQL.InputType('RatingUpdateWithWhereUniqueWithoutMovieInput', {})
export class RatingUpdateWithWhereUniqueWithoutMovieInput {
  @TypeGraphQL.Field((_type) => RatingWhereUniqueInput, {
    nullable: false,
  })
  where!: RatingWhereUniqueInput;

  @TypeGraphQL.Field((_type) => RatingUpdateWithoutMovieInput, {
    nullable: false,
  })
  data!: RatingUpdateWithoutMovieInput;
}
