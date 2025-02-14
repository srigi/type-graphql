import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { MovieUpdateWithoutRatingInput } from '../inputs/MovieUpdateWithoutRatingInput';
import { MovieWhereInput } from '../inputs/MovieWhereInput';

@TypeGraphQL.InputType('MovieUpdateToOneWithWhereWithoutRatingInput', {})
export class MovieUpdateToOneWithWhereWithoutRatingInput {
  @TypeGraphQL.Field((_type) => MovieWhereInput, {
    nullable: true,
  })
  where?: MovieWhereInput | undefined;

  @TypeGraphQL.Field((_type) => MovieUpdateWithoutRatingInput, {
    nullable: false,
  })
  data!: MovieUpdateWithoutRatingInput;
}
