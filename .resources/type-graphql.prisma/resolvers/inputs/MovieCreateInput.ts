import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { RatingCreateNestedManyWithoutMovieInput } from '../inputs/RatingCreateNestedManyWithoutMovieInput';

@TypeGraphQL.InputType('MovieCreateInput', {})
export class MovieCreateInput {
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

  @TypeGraphQL.Field((_type) => RatingCreateNestedManyWithoutMovieInput, {
    nullable: true,
  })
  rating?: RatingCreateNestedManyWithoutMovieInput | undefined;
}
