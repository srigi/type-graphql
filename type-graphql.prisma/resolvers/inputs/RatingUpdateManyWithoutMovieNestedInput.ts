import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { RatingCreateManyMovieInputEnvelope } from '../inputs/RatingCreateManyMovieInputEnvelope';
import { RatingCreateOrConnectWithoutMovieInput } from '../inputs/RatingCreateOrConnectWithoutMovieInput';
import { RatingCreateWithoutMovieInput } from '../inputs/RatingCreateWithoutMovieInput';
import { RatingScalarWhereInput } from '../inputs/RatingScalarWhereInput';
import { RatingUpdateManyWithWhereWithoutMovieInput } from '../inputs/RatingUpdateManyWithWhereWithoutMovieInput';
import { RatingUpdateWithWhereUniqueWithoutMovieInput } from '../inputs/RatingUpdateWithWhereUniqueWithoutMovieInput';
import { RatingUpsertWithWhereUniqueWithoutMovieInput } from '../inputs/RatingUpsertWithWhereUniqueWithoutMovieInput';
import { RatingWhereUniqueInput } from '../inputs/RatingWhereUniqueInput';

@TypeGraphQL.InputType('RatingUpdateManyWithoutMovieNestedInput', {})
export class RatingUpdateManyWithoutMovieNestedInput {
  @TypeGraphQL.Field((_type) => [RatingCreateWithoutMovieInput], {
    nullable: true,
  })
  create?: RatingCreateWithoutMovieInput[] | undefined;

  @TypeGraphQL.Field((_type) => [RatingCreateOrConnectWithoutMovieInput], {
    nullable: true,
  })
  connectOrCreate?: RatingCreateOrConnectWithoutMovieInput[] | undefined;

  @TypeGraphQL.Field((_type) => [RatingUpsertWithWhereUniqueWithoutMovieInput], {
    nullable: true,
  })
  upsert?: RatingUpsertWithWhereUniqueWithoutMovieInput[] | undefined;

  @TypeGraphQL.Field((_type) => RatingCreateManyMovieInputEnvelope, {
    nullable: true,
  })
  createMany?: RatingCreateManyMovieInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [RatingWhereUniqueInput], {
    nullable: true,
  })
  set?: RatingWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [RatingWhereUniqueInput], {
    nullable: true,
  })
  disconnect?: RatingWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [RatingWhereUniqueInput], {
    nullable: true,
  })
  delete?: RatingWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [RatingWhereUniqueInput], {
    nullable: true,
  })
  connect?: RatingWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [RatingUpdateWithWhereUniqueWithoutMovieInput], {
    nullable: true,
  })
  update?: RatingUpdateWithWhereUniqueWithoutMovieInput[] | undefined;

  @TypeGraphQL.Field((_type) => [RatingUpdateManyWithWhereWithoutMovieInput], {
    nullable: true,
  })
  updateMany?: RatingUpdateManyWithWhereWithoutMovieInput[] | undefined;

  @TypeGraphQL.Field((_type) => [RatingScalarWhereInput], {
    nullable: true,
  })
  deleteMany?: RatingScalarWhereInput[] | undefined;
}
