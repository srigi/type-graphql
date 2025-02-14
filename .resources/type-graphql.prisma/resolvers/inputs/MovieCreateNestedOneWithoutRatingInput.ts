import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { MovieCreateOrConnectWithoutRatingInput } from '../inputs/MovieCreateOrConnectWithoutRatingInput';
import { MovieCreateWithoutRatingInput } from '../inputs/MovieCreateWithoutRatingInput';
import { MovieWhereUniqueInput } from '../inputs/MovieWhereUniqueInput';

@TypeGraphQL.InputType('MovieCreateNestedOneWithoutRatingInput', {})
export class MovieCreateNestedOneWithoutRatingInput {
  @TypeGraphQL.Field((_type) => MovieCreateWithoutRatingInput, {
    nullable: true,
  })
  create?: MovieCreateWithoutRatingInput | undefined;

  @TypeGraphQL.Field((_type) => MovieCreateOrConnectWithoutRatingInput, {
    nullable: true,
  })
  connectOrCreate?: MovieCreateOrConnectWithoutRatingInput | undefined;

  @TypeGraphQL.Field((_type) => MovieWhereUniqueInput, {
    nullable: true,
  })
  connect?: MovieWhereUniqueInput | undefined;
}
