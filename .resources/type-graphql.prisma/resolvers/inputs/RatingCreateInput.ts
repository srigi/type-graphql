import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { MovieCreateNestedOneWithoutRatingInput } from '../inputs/MovieCreateNestedOneWithoutRatingInput';

@TypeGraphQL.InputType('RatingCreateInput', {})
export class RatingCreateInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  publicId!: string;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  score!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  createdAt!: number;

  @TypeGraphQL.Field((_type) => MovieCreateNestedOneWithoutRatingInput, {
    nullable: false,
  })
  movie!: MovieCreateNestedOneWithoutRatingInput;
}
