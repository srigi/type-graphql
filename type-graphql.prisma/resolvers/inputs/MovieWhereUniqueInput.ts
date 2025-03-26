import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { MovieWhereInput } from '../inputs/MovieWhereInput';
import { RatingListRelationFilter } from '../inputs/RatingListRelationFilter';
import { StringFilter } from '../inputs/StringFilter';

@TypeGraphQL.InputType('MovieWhereUniqueInput', {})
export class MovieWhereUniqueInput {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  id?: number | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  publicId?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  slug?: string | undefined;

  @TypeGraphQL.Field((_type) => [MovieWhereInput], {
    nullable: true,
  })
  AND?: MovieWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MovieWhereInput], {
    nullable: true,
  })
  OR?: MovieWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MovieWhereInput], {
    nullable: true,
  })
  NOT?: MovieWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  name?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  released?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => RatingListRelationFilter, {
    nullable: true,
  })
  rating?: RatingListRelationFilter | undefined;
}
