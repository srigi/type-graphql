import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { MovieCreateOrConnectWithoutRatingInput } from '../inputs/MovieCreateOrConnectWithoutRatingInput';
import { MovieCreateWithoutRatingInput } from '../inputs/MovieCreateWithoutRatingInput';
import { MovieUpdateToOneWithWhereWithoutRatingInput } from '../inputs/MovieUpdateToOneWithWhereWithoutRatingInput';
import { MovieUpsertWithoutRatingInput } from '../inputs/MovieUpsertWithoutRatingInput';
import { MovieWhereUniqueInput } from '../inputs/MovieWhereUniqueInput';

@TypeGraphQL.InputType('MovieUpdateOneRequiredWithoutRatingNestedInput', {})
export class MovieUpdateOneRequiredWithoutRatingNestedInput {
  @TypeGraphQL.Field((_type) => MovieCreateWithoutRatingInput, {
    nullable: true,
  })
  create?: MovieCreateWithoutRatingInput | undefined;

  @TypeGraphQL.Field((_type) => MovieCreateOrConnectWithoutRatingInput, {
    nullable: true,
  })
  connectOrCreate?: MovieCreateOrConnectWithoutRatingInput | undefined;

  @TypeGraphQL.Field((_type) => MovieUpsertWithoutRatingInput, {
    nullable: true,
  })
  upsert?: MovieUpsertWithoutRatingInput | undefined;

  @TypeGraphQL.Field((_type) => MovieWhereUniqueInput, {
    nullable: true,
  })
  connect?: MovieWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => MovieUpdateToOneWithWhereWithoutRatingInput, {
    nullable: true,
  })
  update?: MovieUpdateToOneWithWhereWithoutRatingInput | undefined;
}
