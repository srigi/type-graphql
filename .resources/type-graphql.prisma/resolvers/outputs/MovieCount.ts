import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { MovieCountRatingArgs } from './args/MovieCountRatingArgs';

@TypeGraphQL.ObjectType('MovieCount', {})
export class MovieCount {
  rating!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: 'rating',
    nullable: false,
  })
  getRating(@TypeGraphQL.Root() root: MovieCount, @TypeGraphQL.Args() args: MovieCountRatingArgs): number {
    return root.rating;
  }
}
