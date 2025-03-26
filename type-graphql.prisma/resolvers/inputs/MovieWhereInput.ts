import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { IntFilter } from '../inputs/IntFilter';
import { RatingListRelationFilter } from '../inputs/RatingListRelationFilter';
import { StringFilter } from '../inputs/StringFilter';

@TypeGraphQL.InputType('MovieWhereInput', {})
export class MovieWhereInput {
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

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  publicId?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  name?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  slug?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  released?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => RatingListRelationFilter, {
    nullable: true,
  })
  rating?: RatingListRelationFilter | undefined;
}
