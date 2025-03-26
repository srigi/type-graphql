import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { MovieAvgOrderByAggregateInput } from '../inputs/MovieAvgOrderByAggregateInput';
import { MovieCountOrderByAggregateInput } from '../inputs/MovieCountOrderByAggregateInput';
import { MovieMaxOrderByAggregateInput } from '../inputs/MovieMaxOrderByAggregateInput';
import { MovieMinOrderByAggregateInput } from '../inputs/MovieMinOrderByAggregateInput';
import { MovieSumOrderByAggregateInput } from '../inputs/MovieSumOrderByAggregateInput';
import { SortOrder } from '../../enums/SortOrder';

@TypeGraphQL.InputType('MovieOrderByWithAggregationInput', {})
export class MovieOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  publicId?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  name?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  slug?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  released?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => MovieCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: MovieCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => MovieAvgOrderByAggregateInput, {
    nullable: true,
  })
  _avg?: MovieAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => MovieMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: MovieMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => MovieMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: MovieMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => MovieSumOrderByAggregateInput, {
    nullable: true,
  })
  _sum?: MovieSumOrderByAggregateInput | undefined;
}
