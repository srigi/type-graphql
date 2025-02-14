import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../client';
import { DecimalJSScalar } from '../scalars';
import { Movie } from '../models/Movie';

@TypeGraphQL.ObjectType('Rating', {})
export class Rating {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  id!: number;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  publicId!: string;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  score!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  createdAt!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  movieId!: number;

  movie?: Movie;
}
