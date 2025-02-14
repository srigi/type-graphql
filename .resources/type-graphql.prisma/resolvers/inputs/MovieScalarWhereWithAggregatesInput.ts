import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { IntWithAggregatesFilter } from '../inputs/IntWithAggregatesFilter';
import { StringWithAggregatesFilter } from '../inputs/StringWithAggregatesFilter';

@TypeGraphQL.InputType('MovieScalarWhereWithAggregatesInput', {})
export class MovieScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [MovieScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: MovieScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MovieScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: MovieScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MovieScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: MovieScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  publicId?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  name?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  slug?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  released?: StringWithAggregatesFilter | undefined;
}
