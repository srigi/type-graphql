import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { IntWithAggregatesFilter } from '../inputs/IntWithAggregatesFilter';
import { StringWithAggregatesFilter } from '../inputs/StringWithAggregatesFilter';

@TypeGraphQL.InputType('RatingScalarWhereWithAggregatesInput', {})
export class RatingScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [RatingScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: RatingScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [RatingScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: RatingScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [RatingScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: RatingScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  publicId?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  score?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  createdAt?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  movieId?: IntWithAggregatesFilter | undefined;
}
