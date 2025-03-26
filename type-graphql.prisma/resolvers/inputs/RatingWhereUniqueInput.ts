import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { IntFilter } from '../inputs/IntFilter';
import { MovieRelationFilter } from '../inputs/MovieRelationFilter';
import { RatingWhereInput } from '../inputs/RatingWhereInput';

@TypeGraphQL.InputType('RatingWhereUniqueInput', {})
export class RatingWhereUniqueInput {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  id?: number | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  publicId?: string | undefined;

  @TypeGraphQL.Field((_type) => [RatingWhereInput], {
    nullable: true,
  })
  AND?: RatingWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [RatingWhereInput], {
    nullable: true,
  })
  OR?: RatingWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [RatingWhereInput], {
    nullable: true,
  })
  NOT?: RatingWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  score?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  createdAt?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  movieId?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => MovieRelationFilter, {
    nullable: true,
  })
  movie?: MovieRelationFilter | undefined;
}
