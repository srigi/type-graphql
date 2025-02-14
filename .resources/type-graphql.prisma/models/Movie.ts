import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../client';
import { DecimalJSScalar } from '../scalars';
import { Rating } from '../models/Rating';
import { MovieCount } from '../resolvers/outputs/MovieCount';

@TypeGraphQL.ObjectType('Movie', {})
export class Movie {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  id!: number;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  publicId!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  name!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  slug!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  released!: string;

  rating?: Rating[];

  @TypeGraphQL.Field((_type) => MovieCount, {
    nullable: true,
  })
  _count?: MovieCount | null;
}
