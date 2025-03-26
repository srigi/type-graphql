import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { IntFilter } from '../inputs/IntFilter';
import { MovieRelationFilter } from '../inputs/MovieRelationFilter';
import { StringFilter } from '../inputs/StringFilter';

@TypeGraphQL.InputType('RatingWhereInput', {})
export class RatingWhereInput {
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
  id?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  publicId?: StringFilter | undefined;

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
