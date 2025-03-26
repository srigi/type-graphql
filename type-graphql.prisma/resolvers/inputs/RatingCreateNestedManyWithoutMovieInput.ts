import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { RatingCreateManyMovieInputEnvelope } from '../inputs/RatingCreateManyMovieInputEnvelope';
import { RatingCreateOrConnectWithoutMovieInput } from '../inputs/RatingCreateOrConnectWithoutMovieInput';
import { RatingCreateWithoutMovieInput } from '../inputs/RatingCreateWithoutMovieInput';
import { RatingWhereUniqueInput } from '../inputs/RatingWhereUniqueInput';

@TypeGraphQL.InputType('RatingCreateNestedManyWithoutMovieInput', {})
export class RatingCreateNestedManyWithoutMovieInput {
  @TypeGraphQL.Field((_type) => [RatingCreateWithoutMovieInput], {
    nullable: true,
  })
  create?: RatingCreateWithoutMovieInput[] | undefined;

  @TypeGraphQL.Field((_type) => [RatingCreateOrConnectWithoutMovieInput], {
    nullable: true,
  })
  connectOrCreate?: RatingCreateOrConnectWithoutMovieInput[] | undefined;

  @TypeGraphQL.Field((_type) => RatingCreateManyMovieInputEnvelope, {
    nullable: true,
  })
  createMany?: RatingCreateManyMovieInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [RatingWhereUniqueInput], {
    nullable: true,
  })
  connect?: RatingWhereUniqueInput[] | undefined;
}
