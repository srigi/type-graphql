import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { RatingCreateWithoutMovieInput } from '../inputs/RatingCreateWithoutMovieInput';
import { RatingWhereUniqueInput } from '../inputs/RatingWhereUniqueInput';

@TypeGraphQL.InputType('RatingCreateOrConnectWithoutMovieInput', {})
export class RatingCreateOrConnectWithoutMovieInput {
  @TypeGraphQL.Field((_type) => RatingWhereUniqueInput, {
    nullable: false,
  })
  where!: RatingWhereUniqueInput;

  @TypeGraphQL.Field((_type) => RatingCreateWithoutMovieInput, {
    nullable: false,
  })
  create!: RatingCreateWithoutMovieInput;
}
